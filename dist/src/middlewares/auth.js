import catchAsync from "../utils/catchAsync";
import jwt from 'jsonwebtoken';
import config from "../config/config";
import { AppError } from "../errors/AppError";
const auth = (...requiredRoles) => {
    return catchAsync(async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new AppError(401, 'You are not authorized!');
        }
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
        const decode = jwt.verify(token, config.jwt_access_secret);
        const { role } = decode;
        if (requiredRoles.length && (!role || !requiredRoles.includes(role))) {
            throw new AppError(403, 'You do not have permission to access this route');
        }
        req.user = decode;
        next();
    });
};
export default auth;
//# sourceMappingURL=auth.js.map