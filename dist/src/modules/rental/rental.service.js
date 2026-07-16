"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalService = void 0;
const AppError_1 = require("../../errors/AppError");
const prisma_1 = require("../../lib/prisma");
const VALID_TRANSITIONS = {
    PLACED: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["PAID", "CANCELLED"],
    PAID: ["PICKED_UP"],
    PICKED_UP: ["RETURNED"],
    RETURNED: [],
    CANCELLED: [],
};
const createRentalOrderIntoDB = async (customerId, payload) => {
    const gear = await prisma_1.prisma.gearItem.findUnique({
        where: { id: payload.gearId, isDeleted: false },
    });
    if (!gear)
        throw new AppError_1.AppError(404, "Gear not found!");
    if (gear.stock <= 0)
        throw new AppError_1.AppError(400, "Gear is out of stock!");
    const [result] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.rentalOrder.create({
            data: {
                customerId,
                gearId: payload.gearId,
                startDate: new Date(payload.startDate),
                endDate: new Date(payload.endDate),
                status: "PLACED",
            },
        }),
        prisma_1.prisma.gearItem.update({
            where: { id: payload.gearId },
            data: { stock: { decrement: 1 } },
        }),
    ]);
    return result;
};
const getCustomerRentalsFromDB = async (customerId) => {
    return await prisma_1.prisma.rentalOrder.findMany({
        where: { customerId },
        include: { gear: { include: { category: true } }, payment: true },
        orderBy: { createdAt: "desc" },
    });
};
const getRentalByIdFromDB = async (orderId, userId) => {
    const order = await prisma_1.prisma.rentalOrder.findUnique({
        where: { id: orderId },
        include: {
            customer: { select: { id: true, name: true, email: true } },
            gear: { include: { category: true, provider: { select: { id: true, name: true, email: true } } } },
            payment: true,
        },
    });
    if (!order)
        throw new AppError_1.AppError(404, "Rental order not found!");
    const isCustomer = order.customerId === userId;
    const isProvider = order.gear.providerId === userId;
    if (!isCustomer && !isProvider) {
        throw new AppError_1.AppError(403, "You do not have access to this order");
    }
    return order;
};
const cancelRentalInDB = async (orderId, customerId) => {
    const order = await prisma_1.prisma.rentalOrder.findUnique({
        where: { id: orderId },
        include: { gear: true },
    });
    if (!order)
        throw new AppError_1.AppError(404, "Rental order not found!");
    if (order.customerId !== customerId)
        throw new AppError_1.AppError(403, "You can only cancel your own orders!");
    const allowed = VALID_TRANSITIONS[order.status];
    if (!allowed || !allowed.includes("CANCELLED")) {
        throw new AppError_1.AppError(400, `Cannot cancel order in ${order.status} status`);
    }
    const [result] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.rentalOrder.update({
            where: { id: orderId },
            data: { status: "CANCELLED" },
        }),
        prisma_1.prisma.gearItem.update({
            where: { id: order.gearId },
            data: { stock: { increment: 1 } },
        }),
    ]);
    return result;
};
const getProviderOrdersFromDB = async (providerId) => {
    return await prisma_1.prisma.rentalOrder.findMany({
        where: { gear: { providerId } },
        include: {
            customer: { select: { id: true, name: true, email: true } },
            gear: { include: { category: true } },
            payment: true,
        },
        orderBy: { createdAt: "desc" },
    });
};
const updateOrderStatusInDB = async (orderId, providerId, newStatus) => {
    const order = await prisma_1.prisma.rentalOrder.findUnique({
        where: { id: orderId },
        include: { gear: true },
    });
    if (!order)
        throw new AppError_1.AppError(404, "Rental order not found!");
    if (order.gear.providerId !== providerId)
        throw new AppError_1.AppError(403, "You can only update your own gear orders!");
    const currentStatus = order.status;
    const allowed = VALID_TRANSITIONS[currentStatus];
    if (!allowed || !allowed.includes(newStatus)) {
        throw new AppError_1.AppError(400, `Cannot transition from ${currentStatus} to ${newStatus}`);
    }
    const operations = [
        prisma_1.prisma.rentalOrder.update({
            where: { id: orderId },
            data: { status: newStatus },
        }),
    ];
    if (newStatus === "CANCELLED" || newStatus === "RETURNED") {
        operations.push(prisma_1.prisma.gearItem.update({
            where: { id: order.gearId },
            data: { stock: { increment: 1 } },
        }));
    }
    const [result] = await prisma_1.prisma.$transaction(operations);
    return result;
};
exports.RentalService = {
    createRentalOrderIntoDB,
    getCustomerRentalsFromDB,
    getRentalByIdFromDB,
    cancelRentalInDB,
    getProviderOrdersFromDB,
    updateOrderStatusInDB,
};
//# sourceMappingURL=rental.service.js.map