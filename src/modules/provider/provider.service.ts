import { OrderStatus } from "../../../generated/prisma/enums";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import { RentalService } from "../rental/rental.service";

const createGearIntoDB = async (providerId: string, payload: any) => {
  return await prisma.gearItem.create({
    data: { ...payload, providerId },
  });
};

const updateGearInDB = async (providerId: string, gearId: string, payload: any) => {
  const gear = await prisma.gearItem.findUnique({ where: { id: gearId } });
  if (!gear) throw new AppError(404, "Gear not found!");
  if (gear.providerId !== providerId) throw new AppError(403, "You can only update your own gear");

  return await prisma.gearItem.update({ where: { id: gearId }, data: payload });
};

const deleteGearFromDB = async (providerId: string, gearId: string) => {
  const gear = await prisma.gearItem.findUnique({ where: { id: gearId } });
  if (!gear) throw new AppError(404, "Gear not found!");
  if (gear.providerId !== providerId) throw new AppError(403, "You can only delete your own gear");

  return await prisma.gearItem.update({ where: { id: gearId }, data: { isDeleted: true } });
};

const getMyGearFromDB = async (providerId: string) => {
  return await prisma.gearItem.findMany({
    where: { providerId },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
};

const getProviderOrdersFromDB = async (providerId: string) => {
  return await RentalService.getProviderOrdersFromDB(providerId);
};

const updateOrderStatusInDB = async (orderId: string, providerId: string, status: string) => {
  return await RentalService.updateOrderStatusInDB(orderId, providerId, status as OrderStatus);
};

export const ProviderService = {
  createGearIntoDB,
  updateGearInDB,
  deleteGearFromDB,
  getMyGearFromDB,
  getProviderOrdersFromDB,
  updateOrderStatusInDB,
};
