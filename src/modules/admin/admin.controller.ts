import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const userId = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  if (!userId) {
    throw new Error("User ID is required");
  }

  const result = await AdminService.updateUserStatusInDB(
    userId,
    req.body.status,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User status updated",
    data: result,
  });
});

const getAllGears = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllGearsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All gears retrieved",
    data: result,
  });
});

const getAllRentals = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllRentalsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All rentals retrieved",
    data: result,
  });
});

export const AdminController = {
  getAllUsers,
  updateUserStatus,
  getAllGears,
  getAllRentals,
};
