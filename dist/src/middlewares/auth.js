"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const AppError_1 = require("../errors/AppError");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)(async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new AppError_1.AppError(401, 'You are not authorized!');
        }
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
        const decode = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const { role } = decode;
        if (requiredRoles.length && (!role || !requiredRoles.includes(role))) {
            throw new AppError_1.AppError(403, 'You do not have permission to access this route');
        }
        req.user = decode;
        next();
    });
};
exports.default = auth;
//# sourceMappingURL=auth.js.map