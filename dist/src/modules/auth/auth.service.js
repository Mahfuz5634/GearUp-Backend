"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../lib/prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const AppError_1 = require("../../errors/AppError");
const registerUserDB = async (payload) => {
    const existingUser = await prisma_1.prisma.user.findUnique({ where: { email: payload.email } });
    if (existingUser)
        throw new AppError_1.AppError(409, "User with this email already exists");
    const hashedPassword = await bcrypt_1.default.hash(payload.password, 12);
    const result = await prisma_1.prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword,
        },
    });
    const { password, ...userData } = result;
    return userData;
};
const getMe = async (userId) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new AppError_1.AppError(404, "User not found");
    const { password, ...userData } = user;
    return userData;
};
const loginUser = async (payload) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { email: payload.email },
    });
    if (!user) {
        throw new AppError_1.AppError(401, "Invalid email or password");
    }
    if (user.status === "SUSPENDED") {
        throw new AppError_1.AppError(403, "Your account has been suspended");
    }
    const isPasswordMatched = await bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.AppError(401, "Invalid email or password");
    }
    const secret = config_1.default.jwt_access_secret;
    const expiresIn = config_1.default.jwt_expires_in;
    const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, secret, { expiresIn });
    const { password, ...userData } = user;
    return { user: userData, accessToken };
};
exports.AuthService = {
    registerUserDB,
    loginUser,
    getMe,
};
//# sourceMappingURL=auth.service.js.map