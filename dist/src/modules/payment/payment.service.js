import Stripe from "stripe";
import config from "../../config/config";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
const stripeSecret = config.stripe_secret_key;
if (!stripeSecret) {
    throw new Error("Stripe secret key is not configured.");
}
const stripe = new Stripe(stripeSecret, {
    apiVersion: "2024-04-10",
});
const createCheckoutSessionIntoDB = async (customerId, rentalOrderId) => {
    const order = await prisma.rentalOrder.findUnique({
        where: { id: rentalOrderId },
        include: { gear: true, customer: true },
    });
    if (!order)
        throw new AppError(404, "Rental order not found!");
    if (order.customerId !== customerId)
        throw new AppError(403, "This is not your order!");
    if (order.status !== "CONFIRMED")
        throw new AppError(400, "Order must be CONFIRMED by provider before payment.");
    const existingPayment = await prisma.payment.findFirst({
        where: { rentalOrderId, status: "PENDING" },
    });
    if (existingPayment) {
        try {
            const existingSession = await stripe.checkout.sessions.retrieve(existingPayment.transactionId);
            if (existingSession.url) {
                return {
                    checkoutUrl: existingSession.url,
                    transactionId: existingPayment.transactionId,
                    paymentId: existingPayment.id,
                };
            }
        }
        catch {
            await prisma.payment.delete({ where: { id: existingPayment.id } });
        }
    }
    const days = Math.ceil((new Date(order.endDate).getTime() - new Date(order.startDate).getTime()) /
        (1000 * 3600 * 24));
    const totalAmount = order.gear.price * (days === 0 ? 1 : days);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: order.customer.email,
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: order.gear.name,
                        description: `Rental from ${new Date(order.startDate).toLocaleDateString()} to ${new Date(order.endDate).toLocaleDateString()}`,
                    },
                    unit_amount: Math.round(totalAmount * 100),
                },
                quantity: 1,
            },
        ],
        metadata: {
            rentalOrderId: order.id,
            customerId,
        },
        success_url: `${config.frontend_url || "http://localhost:5173"}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.frontend_url || "http://localhost:5173"}/payments/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });
    const payment = await prisma.payment.create({
        data: {
            transactionId: session.id,
            rentalOrderId: order.id,
            amount: totalAmount,
            method: "Stripe",
            status: "PENDING",
        },
    });
    return {
        checkoutUrl: session.url,
        transactionId: session.id,
        paymentId: payment.id,
    };
};
const handleStripeWebhook = async (rawBody, signature) => {
    const webhookSecret = config.stripe_webhook_secret;
    if (!webhookSecret) {
        throw new AppError(500, "Stripe webhook secret not configured");
    }
    let event;
    try {
        event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    }
    catch {
        throw new AppError(400, "Invalid webhook signature");
    }
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        await confirmPaymentBySessionId(session.id);
    }
    if (event.type === "checkout.session.expired") {
        const session = event.data.object;
        await prisma.payment.updateMany({
            where: { transactionId: session.id, status: "PENDING" },
            data: { status: "FAILED" },
        });
    }
    return { received: true };
};
const confirmPaymentInDB = async (transactionId) => {
    const payment = await prisma.payment.findUnique({
        where: { transactionId },
    });
    if (!payment)
        throw new AppError(404, "Payment not found!");
    if (payment.status !== "PENDING")
        throw new AppError(400, "Payment is not in PENDING status");
    const session = await stripe.checkout.sessions.retrieve(transactionId);
    if (session.payment_status !== "paid" && session.status !== "complete") {
        throw new AppError(400, "Payment has not been completed on Stripe");
    }
    await confirmPaymentBySessionId(transactionId);
    return payment;
};
const confirmPaymentBySessionId = async (sessionId) => {
    const payment = await prisma.payment.findUnique({
        where: { transactionId: sessionId },
    });
    if (!payment || payment.status !== "PENDING")
        return;
    await prisma.$transaction([
        prisma.payment.update({
            where: { transactionId: sessionId },
            data: { status: "COMPLETED", paidAt: new Date() },
        }),
        prisma.rentalOrder.update({
            where: { id: payment.rentalOrderId },
            data: { status: "PAID" },
        }),
    ]);
};
const getMyPaymentsFromDB = async (userId) => {
    return await prisma.payment.findMany({
        where: { rentalOrder: { customerId: userId } },
        include: { rentalOrder: { include: { gear: true } } },
        orderBy: { createdAt: "desc" },
    });
};
const getPaymentByIdFromDB = async (paymentId, userId) => {
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
    if (!payment)
        throw new AppError(404, "Payment not found!");
    const isCustomer = payment.rentalOrder.customerId === userId;
    const isProvider = payment.rentalOrder.gear.providerId === userId;
    if (!isCustomer && !isProvider) {
        throw new AppError(403, "You do not have access to this payment");
    }
    return payment;
};
export const PaymentService = {
    createCheckoutSessionIntoDB,
    handleStripeWebhook,
    confirmPaymentInDB,
    getMyPaymentsFromDB,
    getPaymentByIdFromDB,
};
//# sourceMappingURL=payment.service.js.map