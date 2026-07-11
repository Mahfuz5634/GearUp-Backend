import { z } from "zod";
export declare const AuthValidation: {
    registerValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodString;
            email: z.ZodString;
            password: z.ZodString;
            role: z.ZodEnum<{
                CUSTOMER: "CUSTOMER";
                PROVIDER: "PROVIDER";
            }>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    loginValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            email: z.ZodString;
            password: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=auth.validation.d.ts.map