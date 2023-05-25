import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async(req, res, next) =>{
    const authenticatedUserId = req.session.userId;
    try{
        if(!authenticatedUserId){
            throw createHttpError(401, "User not Authenticated.");
        }
        const user = await UserModel.findById(authenticatedUserId).select("+email").exec();
        res.status(200).json(user);
    }catch(error){
        next(error);
    }
}

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
            throw createHttpError(409, `Username: ${existingUsername.username} already exists. Please proceed with another username.`);
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
        req.session.userId = newUser._id;
        res.status(201).json(newUser);
    }catch(error){
        next(error);
    }
}

interface LoginBody{
    username?: string,
    password?: string,
}

export const login: RequestHandler <unknown, unknown, LoginBody, unknown> = async (req, res, next) =>{
    const { username, password } = req.body;

    try {
        if(!username || !password){
            throw createHttpError(400, "Parameters Missing");
        }

        const user = await UserModel.findOne({ username: username }).select("+password +email").exec();

        if(!user){
            throw createHttpError(401, "Invalid Credentials");
        }
        console.log(username, password);
        const passwordMatch = user.password && await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            throw createHttpError(401, "Invalid Credentials");
        }
        
        req.session.userId = user._id;
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler =(req, res, next) =>{
    req.session.destroy((error)=>{
        if(error){
            next(error);
        }else{
            res.sendStatus(200);
        }
    })
}