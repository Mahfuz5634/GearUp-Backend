import { z } from "zod";

// Accepts both JSON arrays and comma-separated strings (multipart/form-data)
const featuresSchema = z
  .union([z.array(z.string()), z.string()])
  .optional();

const createGearValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, {
      message: "Description is required",
    }),
    price: z.coerce.number({ message: "Price must be a number" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    model: z.string().optional(),
    stock: z.coerce.number({ message: "Stock must be a number" }).int(),
    condition: z.string().optional(),
    features: featuresSchema,
    imageUrl: z.string().url().optional(),
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
    price: z.coerce.number({ message: "Price must be a number" }).optional(),
    brand: z.string().min(1, { message: "Brand is required" }).optional(),
    model: z.string().optional(),
    stock: z.coerce.number({ message: "Stock must be a number" }).int().optional(),
    condition: z.string().optional(),
    features: featuresSchema,
    imageUrl: z.string().url().optional(),
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
