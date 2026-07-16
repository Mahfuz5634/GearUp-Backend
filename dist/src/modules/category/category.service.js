"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const prisma_1 = require("../../lib/prisma");
const createCategoryIntoDB = async (payload) => {
    const result = await prisma_1.prisma.category.create({ data: payload });
    return result;
};
const getAllCategoricalFromDB = async () => {
    return await prisma_1.prisma.category.findMany();
};
exports.CategoryService = {
    createCategoryIntoDB,
    getAllCategoricalFromDB
};
//# sourceMappingURL=category.service.js.map