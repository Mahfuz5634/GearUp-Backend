"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const review_service_1 = require("./review.service");
const createReview = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.user.userId;
    const result = await review_service_1.ReviewService.createReviewIntoDB(customerId, req.body);
    (0, sendResponse_1.default)(res, { statusCode: 201, success: true, message: 'Review added successfully', data: result });
});
exports.ReviewController = { createReview };
//# sourceMappingURL=review.controller.js.map