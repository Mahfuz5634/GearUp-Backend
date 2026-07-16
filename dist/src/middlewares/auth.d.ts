import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
declare const auth: (...requiredRoles: Role[]) => (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
export default auth;
//# sourceMappingURL=auth.d.ts.map