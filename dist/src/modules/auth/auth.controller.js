"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const AppError_1 = require("../../errors/AppError");
const registerUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.registerUserDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: result,
    });
});
const loginUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.loginUser(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User logged in successfully",
        data: result,
    });
});
const getMe = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId)
        throw new AppError_1.AppError(401, "You are not authenticated");
    const result = await auth_service_1.AuthService.getMe(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User profile retrieved successfully",
        data: result,
    });
});
exports.authController = {
    registerUser,
    loginUser,
    getMe,
};
//# sourceMappingURL=auth.controller.js.map