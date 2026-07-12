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

export const GearValidation = {
  createGearValidationSchema,
};