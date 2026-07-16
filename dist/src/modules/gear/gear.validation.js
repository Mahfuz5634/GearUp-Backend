import { z } from "zod";
const createGearValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, { message: "Name is required" }),
        description: z.string().min(1, {
            message: "Description is required",
        }),
        price: z.number(),
        brand: z.string().min(1, { message: "Brand is required" }),
        stock: z.number(),
        categoryId: z.string().min(1, {
            message: "Category ID is required",
        }),
    }),
});
const updateGearValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, { message: "Name is required" }).optional(),
        description: z
            .string()
            .min(1, {
            message: "Description is required",
        })
            .optional(),
        price: z.number().optional(),
        brand: z.string().min(1, { message: "Brand is required" }).optional(),
        stock: z.number().optional(),
        categoryId: z
            .string()
            .min(1, {
            message: "Category ID is required",
        })
            .optional(),
    }),
});
export const GearValidation = {
    createGearValidationSchema,
    updateGearValidationSchema,
};
//# sourceMappingURL=gear.validation.js.map