"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const AppError_1 = require("../../errors/AppError");
const prisma_1 = require("../../lib/prisma");
const getAllUsersFromDB = async () => {
    return await prisma_1.prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
        orderBy: { createdAt: "desc" },
    });
};
const updateUserStatusInDB = async (userId, status) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new AppError_1.AppError(404, "User not found!");
    if (user.role === "ADMIN")
        throw new AppError_1.AppError(403, "Cannot suspend an admin user!");
    return await prisma_1.prisma.user.update({
        where: { id: userId },
        data: { status },
        select: { id: true, name: true, email: true, role: true, status: true },
    });
};
const getAllGearsFromDB = async () => {
    return await prisma_1.prisma.gearItem.findMany({
        include: { provider: { select: { name: true, email: true } }, category: true },
        orderBy: { createdAt: "desc" },
    });
};
const getAllRentalsFromDB = async () => {
    return await prisma_1.prisma.rentalOrder.findMany({
        include: {
            customer: { select: { name: true, email: true } },
            gear: { include: { category: true } },
            payment: true,
        },
        orderBy: { createdAt: "desc" },
    });
};
exports.AdminService = {
    getAllUsersFromDB,
    updateUserStatusInDB,
    getAllGearsFromDB,
    getAllRentalsFromDB,
};
//# sourceMappingURL=admin.service.js.map