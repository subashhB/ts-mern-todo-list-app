import { RequestHandler } from "express";
import TaskModel from "../models/task";

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
        const task = await TaskModel.findById(taskId).exec();
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
}

export const createTask: RequestHandler = async(req, res, next) =>{
    const {title, description} = req.body;
    try{ 
        const task = await TaskModel.create({title, description});
        res.status(201).json(task);
    }catch(error){
        next(error);
    }
}

