import { Request, Response } from "express";
export declare const RentalController: {
    createRentalOrder: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => Promise<void>;
    getMyRentals: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => Promise<void>;
    getRentalById: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => Promise<void>;
    cancelRental: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=rental.controller.d.ts.map