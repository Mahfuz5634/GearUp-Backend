import { prisma } from "../../lib/prisma";
const createGearIntoDB = async (providerId, payload) => {
    const result = await prisma.gearItem.create({
        data: {
            ...payload,
            providerId,
        },
    });
    return result;
};
//all gear
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
    const result = await prisma.gearItem.findMany({
        where: whereConditions,
        include: {
            category: true,
            provider: { select: { name: true, email: true } }
        }
    });
    return result;
};
export const GearService = {
    createGearIntoDB,
    getAllGearFromDB
};
//# sourceMappingURL=gear.service.js.map