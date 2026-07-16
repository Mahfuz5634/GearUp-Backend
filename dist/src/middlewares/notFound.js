"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found!",
        statusCode: 404,
    });
};
exports.default = notFound;
//# sourceMappingURL=notFound.js.map