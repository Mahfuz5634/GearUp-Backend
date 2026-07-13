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
};
//# sourceMappingURL=gear.validation.d.ts.map