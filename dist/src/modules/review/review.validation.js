"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        gearId: zod_1.z.string().min(1, { message: "Gear ID is required" }),
        rating: zod_1.z
            .number({ error: "Rating is required" })
            .min(1, { message: "Rating must be between 1 and 5" })
            .max(5, { message: "Rating must be between 1 and 5" }),
        comment: zod_1.z.string().min(1, { message: "Comment is required" }),
    }),
});
exports.ReviewValidation = { createReviewValidationSchema };
//# sourceMappingURL=review.validation.js.map