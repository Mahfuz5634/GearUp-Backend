import { AppError } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

const getAllUsersFromDB = async () => {
  return await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
};

const updateUserStatusInDB = async (userId: string, status: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError(404, "User not found!");
  if (user.role === "ADMIN") throw new AppError(403, "Cannot suspend an admin user!");

  return await prisma.user.update({
    where: { id: userId },
    data: { status },
    select: { id: true, name: true, email: true, role: true, status: true },
  });
};

const getAllGearsFromDB = async () => {
  return await prisma.gearItem.findMany({
    include: { provider: { select: { name: true, email: true } }, category: true },
    orderBy: { createdAt: "desc" },
  });
};

const getAllRentalsFromDB = async () => {
  return await prisma.rentalOrder.findMany({
    include: {
      customer: { select: { name: true, email: true } },
      gear: { include: { category: true } },
      payment: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const AdminService = {
  getAllUsersFromDB,
  updateUserStatusInDB,
  getAllGearsFromDB,
  getAllRentalsFromDB,
};