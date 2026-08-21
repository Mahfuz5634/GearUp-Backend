"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearValidation = void 0;
const zod_1 = require("zod");
// Accepts both JSON arrays and comma-separated strings (multipart/form-data)
const featuresSchema = zod_1.z
    .union([zod_1.z.array(zod_1.z.string()), zod_1.z.string()])
    .optional();
const createGearValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Name is required" }),
        description: zod_1.z.string().min(1, {
            message: "Description is required",
        }),
        price: zod_1.z.coerce.number({ message: "Price must be a number" }),
        brand: zod_1.z.string().min(1, { message: "Brand is required" }),
        model: zod_1.z.string().optional(),
        stock: zod_1.z.coerce.number({ message: "Stock must be a number" }).int(),
        condition: zod_1.z.string().optional(),
        features: featuresSchema,
        imageUrl: zod_1.z.string().url().optional(),
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
        price: zod_1.z.coerce.number({ message: "Price must be a number" }).optional(),
        brand: zod_1.z.string().min(1, { message: "Brand is required" }).optional(),
        model: zod_1.z.string().optional(),
        stock: zod_1.z.coerce.number({ message: "Stock must be a number" }).int().optional(),
        condition: zod_1.z.string().optional(),
        features: featuresSchema,
        imageUrl: zod_1.z.string().url().optional(),
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