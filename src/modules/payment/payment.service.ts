import Stripe from "stripe";
import config from "../../config/config";
import { prisma } from "../../lib/prisma";



const stripe = new Stripe(config.stripe_secret_key, {
  apiVersion: "2024-04-10" as any,
});

const createPaymentIntentIntoDB = async(customerId:string,rentalOrderId:string)=>{
    const order = await prisma.rentalOrder.findUnique({
        where:{id:rentalOrderId},
        include:{gear:true},
    })
    if(!order) throw new Error("Rental order not found!")
    if(order.customerId!=customerId) throw new Error("This is not your order!")
    if (order.status !== 'CONFIRMED') throw new Error('Order must be CONFIRMED by provider before payment.');

    const days = Math.ceil((new Date(order.endDate).getTime() - new Date(order.startDate).getTime()) / (1000 * 3600 * 24));
    const totalAmount = order.gear.price * (days === 0 ? 1 : days);

    const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalAmount * 100),
    currency: 'usd',
    payment_method_types: ['card'],
  });

  const payment = await prisma.payment.create({
    data: {
      transactionId: paymentIntent.id,
      rentalOrderId: order.id,
      amount: totalAmount,
      method: 'Stripe',
      status: 'PENDING',
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    transactionId: paymentIntent.id,
    paymentId: payment.id,
  };
};


const confirmPaymentInDB = async (transactionId: string) => {

  const payment = await prisma.payment.update({
    where: { transactionId },
    data: { status: 'COMPLETED', paidAt: new Date() },
  });

  await prisma.rentalOrder.update({
    where: { id: payment.rentalOrderId },
    data: { status: 'PAID' },
  });

  return payment;
};

export const PaymentService = {
  createPaymentIntentIntoDB,
  confirmPaymentInDB,
};