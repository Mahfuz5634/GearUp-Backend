"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderService = void 0;
const AppError_1 = require("../../errors/AppError");
const prisma_1 = require("../../lib/prisma");
const rental_service_1 = require("../rental/rental.service");
const createGearIntoDB = async (providerId, payload) => {
    return await prisma_1.prisma.gearItem.create({
        data: { ...payload, providerId },
    });
};
const updateGearInDB = async (providerId, gearId, payload) => {
    const gear = await prisma_1.prisma.gearItem.findUnique({ where: { id: gearId } });
    if (!gear)
        throw new AppError_1.AppError(404, "Gear not found!");
    if (gear.providerId !== providerId)
        throw new AppError_1.AppError(403, "You can only update your own gear");
    return await prisma_1.prisma.gearItem.update({ where: { id: gearId }, data: payload });
};
const deleteGearFromDB = async (providerId, gearId) => {
    const gear = await prisma_1.prisma.gearItem.findUnique({ where: { id: gearId } });
    if (!gear)
        throw new AppError_1.AppError(404, "Gear not found!");
    if (gear.providerId !== providerId)
        throw new AppError_1.AppError(403, "You can only delete your own gear");
    return await prisma_1.prisma.gearItem.update({ where: { id: gearId }, data: { isDeleted: true } });
};
const getMyGearFromDB = async (providerId) => {
    return await prisma_1.prisma.gearItem.findMany({
        where: { providerId },
        include: { category: true },
        orderBy: { createdAt: "desc" },
    });
};
const getProviderOrdersFromDB = async (providerId) => {
    return await rental_service_1.RentalService.getProviderOrdersFromDB(providerId);
};
const updateOrderStatusInDB = async (orderId, providerId, status) => {
    return await rental_service_1.RentalService.updateOrderStatusInDB(orderId, providerId, status);
};
exports.ProviderService = {
    createGearIntoDB,
    updateGearInDB,
    deleteGearFromDB,
    getMyGearFromDB,
    getProviderOrdersFromDB,
    updateOrderStatusInDB,
};
//# sourceMappingURL=provider.service.js.map