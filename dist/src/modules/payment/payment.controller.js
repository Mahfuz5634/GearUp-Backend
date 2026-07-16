"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const payment_service_1 = require("./payment.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AppError_1 = require("../../errors/AppError");
const createCheckoutSession = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.userId;
    const { rentalOrderId } = req.body;
    const result = await payment_service_1.PaymentService.createCheckoutSessionIntoDB(customerId, rentalOrderId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Checkout session created successfully",
        data: result,
    });
});
const handleWebhook = (0, catchAsync_1.default)(async (req, res) => {
    const signature = req.headers["stripe-signature"];
    if (!signature)
        throw new AppError_1.AppError(400, "Missing stripe-signature header");
    const rawBody = req.body;
    if (!rawBody || !Buffer.isBuffer(rawBody)) {
        throw new AppError_1.AppError(400, "Invalid request body");
    }
    const result = await payment_service_1.PaymentService.handleStripeWebhook(rawBody, signature);
    res.status(200).json(result);
});
const confirmPayment = (0, catchAsync_1.default)(async (req, res) => {
    const { transactionId } = req.body;
    if (!transactionId)
        throw new AppError_1.AppError(400, "Transaction ID is required");
    const result = await payment_service_1.PaymentService.confirmPaymentInDB(transactionId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Payment confirmed successfully",
        data: result,
    });
});
const getMyPayments = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.userId;
    const result = await payment_service_1.PaymentService.getMyPaymentsFromDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Payments retrieved successfully",
        data: result,
    });
});
const getPaymentById = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.userId;
    const result = await payment_service_1.PaymentService.getPaymentByIdFromDB(req.params.id, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Payment details retrieved successfully",
        data: result,
    });
});
exports.PaymentController = {
    createCheckoutSession,
    handleWebhook,
    confirmPayment,
    getMyPayments,
    getPaymentById,
};
//# sourceMappingURL=payment.controller.js.map