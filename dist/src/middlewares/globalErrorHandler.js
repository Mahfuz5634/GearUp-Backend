import { AppError } from "../errors/AppError";
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    let stack;
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    if (process.env.NODE_ENV === "development") {
        stack = err.stack;
    }
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        stack,
    });
};
export default globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map