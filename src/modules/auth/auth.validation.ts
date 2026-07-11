import { z } from "zod";

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Email is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    role: z.enum(["CUSTOMER", "PROVIDER"]),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
  }),
});

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
};
