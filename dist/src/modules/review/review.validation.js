import { z } from "zod";
const createReviewValidationSchema = z.object({
    body: z.object({
        gearId: z.string().min(1, { message: "Gear ID is required" }),
        rating: z
            .number({ error: "Rating is required" })
            .min(1, { message: "Rating must be between 1 and 5" })
            .max(5, { message: "Rating must be between 1 and 5" }),
        comment: z.string().min(1, { message: "Comment is required" }),
    }),
});
export const ReviewValidation = { createReviewValidationSchema };
//# sourceMappingURL=review.validation.js.map