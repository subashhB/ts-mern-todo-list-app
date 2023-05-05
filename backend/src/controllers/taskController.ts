import { RequestHandler } from "express";
import TaskModel from "../models/task";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getTasks: RequestHandler = async (req,res,next)=>{
    try{
        const tasks = await TaskModel.find().exec();
        res.status(200).json(tasks);
    }catch(error){
        next(error);
    }
};

export const getTaskById: RequestHandler = async(req, res, next) =>{
    const { taskId } = req.params;
    try {
        if(!mongoose.isValidObjectId(taskId)){
            throw createHttpError(400,"Invalid Task Id");
        }
        const task = await TaskModel.findById(taskId).exec();
        if(!task){
            throw createHttpError(404,"Task not found.");
        }
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
}

interface TaskBody{
    title?: string,
    description?: string,
}

export const createTask: RequestHandler<unknown, unknown, TaskBody, unknown> = async(req, res, next) =>{
    const {title, description} = req.body;
    try{ 
        if(!title){
            throw createHttpError(400,"Task must have title.");
        }
        const task = await TaskModel.create({title, description});
        res.status(201).json(task);
    }catch(error){
        next(error);
    }
}

