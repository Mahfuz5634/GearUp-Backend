import { z } from "zod";
const createRentalValidationSchema = z.object({
    body: z.object({
        gearId: z.string().min(1, { message: "Gear ID is required" }),
        startDate: z.string().min(1, { message: "Start Date is required" }),
        endDate: z.string().min(1, { message: "End Date is required" }),
    }),
});
const updateRentalStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum(["CONFIRMED", "PICKED_UP", "RETURNED", "CANCELLED"], {
            message: "Status is required",
        }),
    }),
});
export const RentalValidation = {
    createRentalValidationSchema,
    updateRentalStatusValidationSchema,
};
//# sourceMappingURL=rental.validation.js.map