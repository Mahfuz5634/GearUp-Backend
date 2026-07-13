import catchAsync from "../utils/catchAsync";
import jwt from 'jsonwebtoken';
import config from "../config/config";
const auth = (...requiredRoles) => {
    return catchAsync(async (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error('You are not authorized!');
        }
        const decode = jwt.verify(token, config.jwt_access_secret);
        const { role } = decode;
        if (requiredRoles.length && (!role || !requiredRoles.includes(role))) {
            throw new Error('You do not have permission to access this route');
        }
        req.user = decode;
        next();
    });
};
export default auth;
//# sourceMappingURL=auth.js.map