"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const category_service_1 = require("./category.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createCategory = (0, catchAsync_1.default)(async (req, res) => {
    const result = await category_service_1.CategoryService.createCategoryIntoDB(req.body);
    (0, sendResponse_1.default)(res, { statusCode: 201, success: true, message: "Category created successfully", data: result });
});
const getAllCategories = (0, catchAsync_1.default)(async (req, res) => {
    const result = await category_service_1.CategoryService.getAllCategoricalFromDB();
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, data: result });
});
exports.CategoryController = { createCategory, getAllCategories };
//# sourceMappingURL=category.controller.js.map