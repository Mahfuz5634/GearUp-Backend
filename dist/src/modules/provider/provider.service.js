import { AppError } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import { RentalService } from "../rental/rental.service";
const createGearIntoDB = async (providerId, payload) => {
    return await prisma.gearItem.create({
        data: { ...payload, providerId },
    });
};
const updateGearInDB = async (providerId, gearId, payload) => {
    const gear = await prisma.gearItem.findUnique({ where: { id: gearId } });
    if (!gear)
        throw new AppError(404, "Gear not found!");
    if (gear.providerId !== providerId)
        throw new AppError(403, "You can only update your own gear");
    return await prisma.gearItem.update({ where: { id: gearId }, data: payload });
};
const deleteGearFromDB = async (providerId, gearId) => {
    const gear = await prisma.gearItem.findUnique({ where: { id: gearId } });
    if (!gear)
        throw new AppError(404, "Gear not found!");
    if (gear.providerId !== providerId)
        throw new AppError(403, "You can only delete your own gear");
    return await prisma.gearItem.update({ where: { id: gearId }, data: { isDeleted: true } });
};
const getMyGearFromDB = async (providerId) => {
    return await prisma.gearItem.findMany({
        where: { providerId },
        include: { category: true },
        orderBy: { createdAt: "desc" },
    });
};
const getProviderOrdersFromDB = async (providerId) => {
    return await RentalService.getProviderOrdersFromDB(providerId);
};
const updateOrderStatusInDB = async (orderId, providerId, status) => {
    return await RentalService.updateOrderStatusInDB(orderId, providerId, status);
};
export const ProviderService = {
    createGearIntoDB,
    updateGearInDB,
    deleteGearFromDB,
    getMyGearFromDB,
    getProviderOrdersFromDB,
    updateOrderStatusInDB,
};
//# sourceMappingURL=provider.service.js.map