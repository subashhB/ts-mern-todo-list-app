import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

interface SignUpBody{
    username?: string,
    email?: string,
    password?: string,
}

export const signUp: RequestHandler<unknown, unknown,SignUpBody, unknown> = async(req, res, next) =>{
    const { username, email, password: passwordRaw } = req.body;
    try{
        if(!username || !email || !passwordRaw){
            throw createHttpError(400, "Parameters Missing");
        }
        const existingUsername = await UserModel.findOne({username: username}).exec();
        if(existingUsername){
            throw createHttpError(409, `Username: ${existingUsername} already exists. Please proceed with another username.`);
        }
        const existingEmail = await UserModel.findOne({email: email}).exec();
        if(existingEmail){
            throw createHttpError(409, "Email already Registered.");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);
        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
        });
        res.status(201).json(newUser);
    }catch(error){
        next(error);
    }
}