"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const rental_service_1 = require("./rental.service");
const createRentalOrder = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.userId;
    const result = await rental_service_1.RentalService.createRentalOrderIntoDB(customerId, req.body);
    (0, sendResponse_1.default)(res, { statusCode: 201, success: true, message: "Rental order placed successfully", data: result });
});
const getMyRentals = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.userId;
    const result = await rental_service_1.RentalService.getCustomerRentalsFromDB(customerId);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Your rentals retrieved", data: result });
});
const getRentalById = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.userId;
    const result = await rental_service_1.RentalService.getRentalByIdFromDB(req.params.id, userId);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Rental details retrieved", data: result });
});
const cancelRental = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.userId;
    const result = await rental_service_1.RentalService.cancelRentalInDB(req.params.id, customerId);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Rental order cancelled", data: result });
});
exports.RentalController = {
    createRentalOrder,
    getMyRentals,
    getRentalById,
    cancelRental,
};
//# sourceMappingURL=rental.controller.js.map