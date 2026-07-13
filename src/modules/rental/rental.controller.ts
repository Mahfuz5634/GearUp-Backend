import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RentalService } from "./rental.service";

const createRentalOrder = catchAsync(async (req: Request, res: Response) => {
  const customerId = (req as any).user.userId;
  const result = await RentalService.createRentalOrderIntoDB(customerId, req.body);
  sendResponse(res, { statusCode: 201, success: true, message: 'Rental order placed successfully', data: result });
});

const getCustomerRentals = catchAsync(async (req: Request, res: Response) => {
  const customerId = (req as any).user.userId;
  const result = await RentalService.getCustomerRentalsFromDB(customerId);
  sendResponse(res, { statusCode: 200, success: true, message: 'Your rentals retrieved', data: result });
});

const getProviderOrders = catchAsync(async (req: Request, res: Response) => {
  const providerId = (req as any).user.userId;
  const result = await RentalService.getProviderOrdersFromDB(providerId);
  sendResponse(res, { statusCode: 200, success: true, message: 'Incoming orders retrieved', data: result });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.id;

  if (typeof orderId !== 'string') {
    throw new Error('Order ID is required');
  }

  const result = await RentalService.updateOrderStatusInDB(orderId, req.body.status);
  sendResponse(res, { statusCode: 200, success: true, message: 'Order status updated', data: result });
});

export const RentalController = {
  createRentalOrder,
  getCustomerRentals,
  getProviderOrders,
  updateOrderStatus,
};