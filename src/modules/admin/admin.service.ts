import { prisma } from "../../lib/prisma";


const getAllUsersFromDB = async () => {
  return await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
  });
};

const updateUserStatusInDB = async (userId: string, status: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { status },
    select: { id: true, name: true, email: true, role: true, status: true },
  });
};

const getAllGearsFromDB = async () => {
  return await prisma.gearItem.findMany({
    include: { provider: { select: { name: true, email: true } }, category: true },
  });
};

const getAllRentalsFromDB = async () => {
  return await prisma.rentalOrder.findMany({
    include: { 
      customer: { select: { name: true, email: true } },
      gear: true,
      payment: true 
    },
  });
};

export const AdminService = {
  getAllUsersFromDB,
  updateUserStatusInDB,
  getAllGearsFromDB,
  getAllRentalsFromDB,
};