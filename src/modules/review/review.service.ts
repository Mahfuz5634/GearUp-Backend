import { prisma } from "../../lib/prisma";


const createReviewIntoDB = async (customerId: string, payload: any) => {
  const hasRented = await prisma.rentalOrder.findFirst({
    where: {
      customerId,
      gearId: payload.gearId,
      status: 'RETURNED',
    },
  });

  if (!hasRented) {
    throw new Error('You can only review gears you have successfully rented and returned.');
  }

  const result = await prisma.review.create({
    data: {
      ...payload,
      customerId,
    },
  });
  return result;
};

export const ReviewService = { createReviewIntoDB };