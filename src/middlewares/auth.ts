import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config/config";

interface AuthRequest extends Request {
    user?: JwtPayload;
}

const auth =(...requiredRoles: Role[])=>{

    return catchAsync(async(req:AuthRequest,res:Response,next:NextFunction)=>{
         const authHeader = req.headers.authorization;

         if(!authHeader){
            const err = new Error('You are not authorized!') as any;
            err.statusCode = 401;
            throw err;

         }
         const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
         const decode = jwt.verify(token,
            config.jwt_access_secret as string
         ) as JwtPayload;

         const {role} = decode;

         if(requiredRoles.length && (!role || !requiredRoles.includes(role as Role))){
            const err = new Error('You do not have permission to access this route') as any;
            err.statusCode = 403;
            throw err;
         }
         req.user = decode;
         next();


    });

};
export default auth;