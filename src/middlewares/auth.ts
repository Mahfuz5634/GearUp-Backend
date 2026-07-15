import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config/config";
import { AppError } from "../errors/AppError";

interface AuthRequest extends Request {
    user?: JwtPayload;
}

const auth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError(401, 'You are not authorized!');
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    const decode = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
    const { role } = decode;

    if (requiredRoles.length && (!role || !requiredRoles.includes(role as Role))) {
      throw new AppError(403, 'You do not have permission to access this route');
    }

    req.user = decode;
    next();
  });
};

export default auth;