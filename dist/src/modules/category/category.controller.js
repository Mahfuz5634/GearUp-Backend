import catchAsync from "../../utils/catchAsync";
import { CategoryService } from "./category.service";
import sendResponse from "../../utils/sendResponse";
const createCategory = catchAsync(async (req, res) => {
    const result = await CategoryService.createCategoryIntoDB(req.body);
    sendResponse(res, { statusCode: 201, success: true, message: "Category created successfully", data: result });
});
const getAllCategories = catchAsync(async (req, res) => {
    const result = await CategoryService.getAllCategoricalFromDB();
    sendResponse(res, { statusCode: 200, success: true, data: result });
});
export const CategoryController = { createCategory, getAllCategories };
//# sourceMappingURL=category.controller.js.map