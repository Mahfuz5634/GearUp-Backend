import { ZodTypeAny } from "zod";
import { NextFunction, Request, Response } from "express";
declare const validateRequest: (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default validateRequest;
//# sourceMappingURL=validateRequest.d.ts.map