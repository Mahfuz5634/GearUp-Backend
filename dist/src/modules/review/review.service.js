import { AppError } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
const createReviewIntoDB = async (customerId, payload) => {
    const hasRented = await prisma.rentalOrder.findFirst({
        where: {
            customerId,
            gearId: payload.gearId,
            status: "RETURNED",
        },
    });
    if (!hasRented) {
        throw new AppError(400, "You can only review gears you have successfully rented and returned.");
    }
    const existingReview = await prisma.review.findFirst({
        where: { customerId, gearId: payload.gearId },
    });
    if (existingReview) {
        throw new AppError(409, "You have already reviewed this gear.");
    }
    const result = await prisma.review.create({
        data: { ...payload, customerId },
    });
    return result;
};
export const ReviewService = { createReviewIntoDB };
//# sourceMappingURL=review.service.js.map