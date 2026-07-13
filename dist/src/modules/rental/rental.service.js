import { prisma } from "../../lib/prisma";
const createRentalOrderIntoDB = async (customerId, payload) => {
    const gear = await prisma.gearItem.findUnique({
        where: {
            id: payload.gearId
        }
    });
    if (!gear)
        throw new Error('Gear not found!');
    if (gear.stock <= 0)
        throw new Error('Gear is out of stock!');
    const result = await prisma.rentalOrder.create({
        data: {
            customerId,
            gearId: payload.gearId,
            startDate: new Date(payload.startDate),
            endDate: new Date(payload.endDate),
            status: 'PLACED',
        },
    });
    return result;
};
const getCustomerRentalsFromDB = async (customerId) => {
    return await prisma.rentalOrder.findMany({
        where: { customerId },
        include: { gear: true, payment: true },
    });
};
const getProviderOrdersFromDB = async (providerId) => {
    return await prisma.rentalOrder.findMany({
        where: {
            gear: { providerId },
        },
        include: { customer: { select: { name: true, email: true } }, gear: true },
    });
};
const updateOrderStatusInDB = async (orderId, status) => {
    const result = await prisma.rentalOrder.update({
        where: { id: orderId },
        data: { status },
    });
    return result;
};
export const RentalService = {
    createRentalOrderIntoDB,
    getCustomerRentalsFromDB,
    getProviderOrdersFromDB,
    updateOrderStatusInDB,
};
//# sourceMappingURL=rental.service.js.map