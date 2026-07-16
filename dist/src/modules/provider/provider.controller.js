import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProviderService } from "./provider.service";
const createGear = catchAsync(async (req, res) => {
    const providerId = req.user.userId;
    const result = await ProviderService.createGearIntoDB(providerId, req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Gear added successfully",
        data: result,
    });
});
const updateGear = catchAsync(async (req, res) => {
    const providerId = req.user.userId;
    const result = await ProviderService.updateGearInDB(providerId, req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Gear updated successfully",
        data: result,
    });
});
const deleteGear = catchAsync(async (req, res) => {
    const providerId = req.user.userId;
    const result = await ProviderService.deleteGearFromDB(providerId, req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Gear deleted successfully",
        data: result,
    });
});
const getMyGear = catchAsync(async (req, res) => {
    const providerId = req.user.userId;
    const result = await ProviderService.getMyGearFromDB(providerId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Your gear retrieved successfully",
        data: result,
    });
});
const getProviderOrders = catchAsync(async (req, res) => {
    const providerId = req.user.userId;
    const result = await ProviderService.getProviderOrdersFromDB(providerId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Incoming orders retrieved successfully",
        data: result,
    });
});
const updateOrderStatus = catchAsync(async (req, res) => {
    const providerId = req.user.userId;
    const result = await ProviderService.updateOrderStatusInDB(req.params.id, providerId, req.body.status);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Order status updated successfully",
        data: result,
    });
});
export const ProviderController = {
    createGear,
    updateGear,
    deleteGear,
    getMyGear,
    getProviderOrders,
    updateOrderStatus,
};
//# sourceMappingURL=provider.controller.js.map