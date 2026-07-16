import { z } from "zod";
export declare const GearValidation: {
    createGearValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodString;
            description: z.ZodString;
            price: z.ZodNumber;
            brand: z.ZodString;
            stock: z.ZodNumber;
            categoryId: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    updateGearValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            price: z.ZodOptional<z.ZodNumber>;
            brand: z.ZodOptional<z.ZodString>;
            stock: z.ZodOptional<z.ZodNumber>;
            categoryId: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=gear.validation.d.ts.map