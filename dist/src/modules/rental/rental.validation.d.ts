import { z } from "zod";
export declare const RentalValidation: {
    createRentalValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            gearId: z.ZodString;
            startDate: z.ZodString;
            endDate: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    updateRentalStatusValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            status: z.ZodEnum<{
                CANCELLED: "CANCELLED";
                CONFIRMED: "CONFIRMED";
                PICKED_UP: "PICKED_UP";
                RETURNED: "RETURNED";
            }>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=rental.validation.d.ts.map