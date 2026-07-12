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
         const token=req.headers.authorization;

         if(!token){
            throw new Error('You are not authorized!');

         }
         const decode = jwt.verify(token,
            config.jwt_access_secret as string
         ) as JwtPayload;

         const {role} = decode;

         if(requiredRoles.length && (!role || !requiredRoles.includes(role as Role))){
            throw new Error('You do not have permission to access this route')
         }
         req.user = decode;
         next();


    });

};
export default auth;