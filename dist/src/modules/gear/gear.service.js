"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearService = void 0;
const prisma_1 = require("../../lib/prisma");
const getAllGearFromDB = async (query) => {
    const { category, brand, minPrice, maxPrice } = query;
    const whereConditions = { isDeleted: false };
    if (category)
        whereConditions.category = { name: category };
    if (brand)
        whereConditions.brand = brand;
    if (minPrice || maxPrice) {
        whereConditions.price = {};
        if (minPrice)
            whereConditions.price.gte = Number(minPrice);
        if (maxPrice)
            whereConditions.price.lte = Number(maxPrice);
    }
    const result = await prisma_1.prisma.gearItem.findMany({
        where: whereConditions,
        include: {
            category: true,
            provider: { select: { name: true, email: true } }
        },
        orderBy: { createdAt: "desc" },
    });
    return result;
};
const getSingleGearFromDB = async (id) => {
    return await prisma_1.prisma.gearItem.findUnique({
        where: { id, isDeleted: false },
        include: {
            category: true,
            provider: { select: { name: true, email: true } },
            reviews: { include: { customer: { select: { name: true } } } }
        }
    });
};
exports.GearService = {
    getAllGearFromDB,
    getSingleGearFromDB,
};
//# sourceMappingURL=gear.service.js.map