import Stripe from "stripe";
import config from "../../config/config";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

const stripeSecret = config.stripe_secret_key;
if (!stripeSecret) {
  throw new Error("Stripe secret key is not configured.");
}

const stripe = new Stripe(stripeSecret, {
  apiVersion: "2024-04-10" as any,
});

const createPaymentIntentIntoDB = async (
  customerId: string,
  rentalOrderId: string,
) => {
  const order = await prisma.rentalOrder.findUnique({
    where: { id: rentalOrderId },
    include: { gear: true },
  });

  if (!order) throw new AppError(404, "Rental order not found!");
  if (order.customerId !== customerId)
    throw new AppError(403, "This is not your order!");
  if (order.status !== "CONFIRMED")
    throw new AppError(400, "Order must be CONFIRMED by provider before payment.");

  const days = Math.ceil(
    (new Date(order.endDate).getTime() - new Date(order.startDate).getTime()) /
      (1000 * 3600 * 24),
  );
  const totalAmount = order.gear.price * (days === 0 ? 1 : days);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalAmount * 100),
    currency: "usd",
    payment_method_types: ["card"],
  });

  const payment = await prisma.payment.create({
    data: {
      transactionId: paymentIntent.id,
      rentalOrderId: order.id,
      amount: totalAmount,
      method: "Stripe",
      status: "PENDING",
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    transactionId: paymentIntent.id,
    paymentId: payment.id,
  };
};

const getMyPaymentsFromDB = async (userId: string) => {
  return await prisma.payment.findMany({
    where: { rentalOrder: { customerId: userId } },
    include: { rentalOrder: { include: { gear: true } } },
    orderBy: { createdAt: "desc" },
  });
};

const confirmPaymentInDB = async (transactionId: string) => {
  const payment = await prisma.payment.findUnique({
    where: { transactionId },
  });

  if (!payment) throw new AppError(404, "Payment not found!");
  if (payment.status !== "PENDING") throw new AppError(400, "Payment is not in PENDING status");

  await prisma.payment.update({
    where: { transactionId },
    data: { status: "COMPLETED", paidAt: new Date() },
  });

  await prisma.rentalOrder.update({
    where: { id: payment.rentalOrderId },
    data: { status: "PAID" },
  });

  return payment;
};

const getPaymentByIdFromDB = async (paymentId: string, userId: string) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      rentalOrder: {
        include: {
          gear: { include: { category: true } },
          customer: { select: { id: true, name: true, email: true } },
        },
      },
    },
  });

  if (!payment) throw new AppError(404, "Payment not found!");

  const isCustomer = payment.rentalOrder.customerId === userId;
  const isProvider = payment.rentalOrder.gear.providerId === userId;

  if (!isCustomer && !isProvider) {
    throw new AppError(403, "You do not have access to this payment");
  }

  return payment;
};

export const PaymentService = {
  createPaymentIntentIntoDB,
  confirmPaymentInDB,
  getMyPaymentsFromDB,
  getPaymentByIdFromDB,
};
