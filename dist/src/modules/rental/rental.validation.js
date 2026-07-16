"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalValidation = void 0;
const zod_1 = require("zod");
const createRentalValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        gearId: zod_1.z.string().min(1, { message: "Gear ID is required" }),
        startDate: zod_1.z.string().min(1, { message: "Start Date is required" }),
        endDate: zod_1.z.string().min(1, { message: "End Date is required" }),
    }),
});
const updateRentalStatusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["CONFIRMED", "PICKED_UP", "RETURNED", "CANCELLED"], {
            message: "Status must be one of: CONFIRMED, PICKED_UP, RETURNED, CANCELLED",
        }),
    }),
});
exports.RentalValidation = {
    createRentalValidationSchema,
    updateRentalStatusValidationSchema,
};
//# sourceMappingURL=rental.validation.js.map