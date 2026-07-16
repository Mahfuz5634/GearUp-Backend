"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearValidation = void 0;
const zod_1 = require("zod");
const createGearValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Name is required" }),
        description: zod_1.z.string().min(1, {
            message: "Description is required",
        }),
        price: zod_1.z.number(),
        brand: zod_1.z.string().min(1, { message: "Brand is required" }),
        stock: zod_1.z.number(),
        categoryId: zod_1.z.string().min(1, {
            message: "Category ID is required",
        }),
    }),
});
const updateGearValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Name is required" }).optional(),
        description: zod_1.z
            .string()
            .min(1, {
            message: "Description is required",
        })
            .optional(),
        price: zod_1.z.number().optional(),
        brand: zod_1.z.string().min(1, { message: "Brand is required" }).optional(),
        stock: zod_1.z.number().optional(),
        categoryId: zod_1.z
            .string()
            .min(1, {
            message: "Category ID is required",
        })
            .optional(),
    }),
});
exports.GearValidation = {
    createGearValidationSchema,
    updateGearValidationSchema,
};
//# sourceMappingURL=gear.validation.js.map