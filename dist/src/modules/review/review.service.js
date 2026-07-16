"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const AppError_1 = require("../../errors/AppError");
const prisma_1 = require("../../lib/prisma");
const createReviewIntoDB = async (customerId, payload) => {
    const hasRented = await prisma_1.prisma.rentalOrder.findFirst({
        where: {
            customerId,
            gearId: payload.gearId,
            status: "RETURNED",
        },
    });
    if (!hasRented) {
        throw new AppError_1.AppError(400, "You can only review gears you have successfully rented and returned.");
    }
    const existingReview = await prisma_1.prisma.review.findFirst({
        where: { customerId, gearId: payload.gearId },
    });
    if (existingReview) {
        throw new AppError_1.AppError(409, "You have already reviewed this gear.");
    }
    const result = await prisma_1.prisma.review.create({
        data: { ...payload, customerId },
    });
    return result;
};
exports.ReviewService = { createReviewIntoDB };
//# sourceMappingURL=review.service.js.map