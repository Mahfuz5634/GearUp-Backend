import { Response } from "express";
type TMeta = {
    page?: number;
    limit?: number;
    total?: number;
};
type TResponse<T> = {
    statusCode: number;
    success: boolean;
    message?: string;
    meta?: TMeta;
    data: T;
};
declare const sendResponse: <T>(res: Response, data: TResponse<T>) => void;
export default sendResponse;
//# sourceMappingURL=sendResponse.d.ts.map