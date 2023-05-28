import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requiresAuth : RequestHandler = async (req, res, next) =>{
    if(req.session.userId){
        next();
    }else{
        next(createHttpError(401, "User not Authenticated"));
    }
}