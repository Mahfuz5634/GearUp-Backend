"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const imgbbUpload_1 = __importDefault(require("../../utils/imgbbUpload"));
const provider_service_1 = require("./provider.service");
const parseGearPayload = async (req) => {
    const body = { ...req.body };
    if (body.price !== undefined)
        body.price = Number(body.price);
    if (body.stock !== undefined)
        body.stock = Number(body.stock);
    if (typeof body.features === "string") {
        body.features = body.features
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean);
    }
    const file = req.file;
    if (file) {
        body.imageUrl = await (0, imgbbUpload_1.default)(file.buffer, file.originalname);
    }
    return body;
};
const createGear = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.userId;
    const payload = await parseGearPayload(req);
    const result = await provider_service_1.ProviderService.createGearIntoDB(providerId, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Gear added successfully",
        data: result,
    });
});
const updateGear = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.userId;
    const payload = await parseGearPayload(req);
    const result = await provider_service_1.ProviderService.updateGearInDB(providerId, req.params.id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Gear updated successfully",
        data: result,
    });
});
const deleteGear = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.userId;
    const result = await provider_service_1.ProviderService.deleteGearFromDB(providerId, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Gear deleted successfully",
        data: result,
    });
});
const getMyGear = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.userId;
    const result = await provider_service_1.ProviderService.getMyGearFromDB(providerId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Your gear retrieved successfully",
        data: result,
    });
});
const getProviderOrders = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.userId;
    const result = await provider_service_1.ProviderService.getProviderOrdersFromDB(providerId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Incoming orders retrieved successfully",
        data: result,
    });
});
const updateOrderStatus = (0, catchAsync_1.default)(async (req, res) => {
    const providerId = req.user.userId;
    const result = await provider_service_1.ProviderService.updateOrderStatusInDB(req.params.id, providerId, req.body.status);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order status updated successfully",
        data: result,
    });
});
exports.ProviderController = {
    createGear,
    updateGear,
    deleteGear,
    getMyGear,
    getProviderOrders,
    updateOrderStatus,
};
//# sourceMappingURL=provider.controller.js.map