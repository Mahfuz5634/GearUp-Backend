import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RentalService } from "./rental.service";

const createRentalOrder = catchAsync(async (req: Request, res: Response) => {
  const customerId = (req as any).user.userId;
  const result = await RentalService.createRentalOrderIntoDB(customerId, req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "Rental order placed successfully", data: result });
});

const getMyRentals = catchAsync(async (req: Request, res: Response) => {
  const customerId = (req as any).user.userId;
  const result = await RentalService.getCustomerRentalsFromDB(customerId);
  sendResponse(res, { statusCode: 200, success: true, message: "Your rentals retrieved", data: result });
});

const getRentalById = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const result = await RentalService.getRentalByIdFromDB(req.params.id, userId);
  sendResponse(res, { statusCode: 200, success: true, message: "Rental details retrieved", data: result });
});

const cancelRental = catchAsync(async (req: Request, res: Response) => {
  const customerId = (req as any).user.userId;
  const result = await RentalService.cancelRentalInDB(req.params.id, customerId);
  sendResponse(res, { statusCode: 200, success: true, message: "Rental order cancelled", data: result });
});

export const RentalController = {
  createRentalOrder,
  getMyRentals,
  getRentalById,
  cancelRental,
};
