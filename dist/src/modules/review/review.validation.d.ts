import { z } from "zod";
export declare const ReviewValidation: {
    createReviewValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            gearId: z.ZodString;
            rating: z.ZodNumber;
            comment: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=review.validation.d.ts.map