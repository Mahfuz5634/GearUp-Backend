import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";
import { AppError } from "../../errors/AppError";
const getAllUsers = catchAsync(async (req, res) => {
    const result = await AdminService.getAllUsersFromDB();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Users retrieved",
        data: result,
    });
});
const updateUserStatus = catchAsync(async (req, res) => {
    const userId = req.params.id;
    if (!userId)
        throw new AppError(400, "User ID is required");
    const result = await AdminService.updateUserStatusInDB(userId, req.body.status);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User status updated",
        data: result,
    });
});
const getAllGears = catchAsync(async (req, res) => {
    const result = await AdminService.getAllGearsFromDB();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All gears retrieved",
        data: result,
    });
});
const getAllRentals = catchAsync(async (req, res) => {
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
//# sourceMappingURL=admin.controller.js.map