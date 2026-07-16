import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import { AppError } from "../../errors/AppError";
const registerUserDB = async (payload) => {
    const existingUser = await prisma.user.findUnique({ where: { email: payload.email } });
    if (existingUser)
        throw new AppError(409, "User with this email already exists");
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    const result = await prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword,
        },
    });
    const { password, ...userData } = result;
    return userData;
};
const getMe = async (userId) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new AppError(404, "User not found");
    const { password, ...userData } = user;
    return userData;
};
const loginUser = async (payload) => {
    const user = await prisma.user.findUnique({
        where: { email: payload.email },
    });
    if (!user) {
        throw new AppError(401, "Invalid email or password");
    }
    if (user.status === "SUSPENDED") {
        throw new AppError(403, "Your account has been suspended");
    }
    const isPasswordMatched = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError(401, "Invalid email or password");
    }
    const secret = config.jwt_access_secret;
    const expiresIn = config.jwt_expires_in;
    const accessToken = jwt.sign({ userId: user.id, role: user.role }, secret, { expiresIn });
    const { password, ...userData } = user;
    return { user: userData, accessToken };
};
export const AuthService = {
    registerUserDB,
    loginUser,
    getMe,
};
//# sourceMappingURL=auth.service.js.map