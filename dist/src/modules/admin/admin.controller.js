"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const admin_service_1 = require("./admin.service");
const AppError_1 = require("../../errors/AppError");
const getAllUsers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await admin_service_1.AdminService.getAllUsersFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Users retrieved",
        data: result,
    });
});
const updateUserStatus = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.params.id;
    if (!userId)
        throw new AppError_1.AppError(400, "User ID is required");
    const result = await admin_service_1.AdminService.updateUserStatusInDB(userId, req.body.status);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User status updated",
        data: result,
    });
});
const getAllGears = (0, catchAsync_1.default)(async (req, res) => {
    const result = await admin_service_1.AdminService.getAllGearsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "All gears retrieved",
        data: result,
    });
});
const getAllRentals = (0, catchAsync_1.default)(async (req, res) => {
    const result = await admin_service_1.AdminService.getAllRentalsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "All rentals retrieved",
        data: result,
    });
});
exports.AdminController = {
    getAllUsers,
    updateUserStatus,
    getAllGears,
    getAllRentals,
};
//# sourceMappingURL=admin.controller.js.map