import { z } from "zod";
export declare const GearValidation: {
    createGearValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodString;
            description: z.ZodString;
            price: z.ZodCoercedNumber<unknown>;
            brand: z.ZodString;
            model: z.ZodOptional<z.ZodString>;
            stock: z.ZodCoercedNumber<unknown>;
            condition: z.ZodOptional<z.ZodString>;
            features: z.ZodOptional<z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodString]>>;
            imageUrl: z.ZodOptional<z.ZodString>;
            categoryId: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    updateGearValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            price: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
            brand: z.ZodOptional<z.ZodString>;
            model: z.ZodOptional<z.ZodString>;
            stock: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
            condition: z.ZodOptional<z.ZodString>;
            features: z.ZodOptional<z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodString]>>;
            imageUrl: z.ZodOptional<z.ZodString>;
            categoryId: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=gear.validation.d.ts.map