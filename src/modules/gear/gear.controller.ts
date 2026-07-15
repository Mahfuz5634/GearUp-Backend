import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { GearService } from "./gear.service";
import sendResponse from "../../utils/sendResponse";

const createGear = catchAsync(async (req: Request, res: Response) => {
  const providerId = (req as any).user.userId;
  const result = await GearService.createGearIntoDB(providerId, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Gear added successfully",
    data: result,
  });
});
const getSingleGear = catchAsync(async (req: Request, res: Response) => {
  const gearId = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  if (!gearId) {
    throw new Error("Gear ID is required");
  }

  const result = await GearService.getSingleGearFromDB(gearId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Gear retrieved successfully",
    data: result,
  });
});

const updateGear = catchAsync(async (req: Request, res: Response) => {
  const providerId = (req as any).user.userId;
  const gearId = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  if (!gearId) {
    throw new Error("Gear ID is required");
  }

  const result = await GearService.updateGearInDB(providerId, gearId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Gear updated successfully",
    data: result,
  });
});

const deleteGear = catchAsync(async (req: Request, res: Response) => {
  const providerId = (req as any).user.userId;
  const gearId = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  if (!gearId) {
    throw new Error("Gear ID is required");
  }

  const result = await GearService.deleteGearFromDB(providerId, gearId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Gear deleted successfully",
    data: result,
  });
});

const getAllGears = catchAsync(async (req: Request, res: Response) => {
  const result = await GearService.getAllGearFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Gears retrieved successfully",
    data: result,
  });
});

export const GearController = {
  createGear,
  getAllGears,
  getSingleGear,
  updateGear,
  deleteGear,
};
