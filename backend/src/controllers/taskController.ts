import { RequestHandler } from "express";
import TaskModel from "../models/task";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../utils/assestIsDefined";

export const getAllTasks: RequestHandler = async (req,res,next)=>{
    const authenticateUserId = req.session.userId;
    try{
        assertIsDefined(authenticateUserId);
        const tasks = await TaskModel.find({userId: authenticateUserId}).exec();
        res.status(200).json(tasks);
    }catch(error){
        next(error);
    }
};

export const getTaskById: RequestHandler = async(req, res, next) =>{
    const { taskId } = req.params;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        if(!mongoose.isValidObjectId(taskId)){
            throw createHttpError(400,"Invalid Task Id");
        }
        const task = await TaskModel.findById(taskId).exec();
        if(!task){
            throw createHttpError(404,"Task not found.");
        }
        if(!task.userId.equals(authenticatedUserId)){
            throw createHttpError(401, "You cannot access this task.");
        }
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
}

interface CreateTaskBody{
    title?: string,
    description?: string,
}

export const createTask: RequestHandler<unknown, unknown, CreateTaskBody, unknown> = async(req, res, next) =>{
    const {title, description} = req.body;
    const authenticatedUserId = req.session.userId;
    try{ 
        assertIsDefined(authenticatedUserId);
        if(!title){
            throw createHttpError(400,"Task must have title.");
        }
        const task = await TaskModel.create({userId: authenticatedUserId, title, description});
        res.status(201).json(task);
    }catch(error){
        next(error);
    }
}

interface UpdateTaskParams{
    taskId: string,
}

interface UpdateTaskBody{
    title?: string,
    description?: string,
}

export const updateTask: RequestHandler<UpdateTaskParams, unknown, UpdateTaskBody, unknown> = async(req, res, next) =>{
    const { taskId } = req.params;
    const { title: newTitle, description: newDescription} = req.body;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        if(!mongoose.isValidObjectId(taskId)){
            throw createHttpError(400,"Invalid Task Id");
        }
        if(!newTitle){
            
            throw createHttpError(400,"Task must have title.");
        }
        const task = await TaskModel.findById(taskId).exec();
        if(!task){
            throw createHttpError(404,"Task not found.");
        } 
        if(!task.userId.equals(authenticatedUserId)){
            throw createHttpError(401,"You cannot access this task.");
        }
        
        task.title = newTitle;
        task.description = newDescription;
        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
}

export const deleteTask: RequestHandler = async(req, res, next) =>{
    const { taskId } = req.params;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        if(!mongoose.isValidObjectId(taskId)){
            throw createHttpError(400,"Invalid Task Id");
        }

        const task = await TaskModel.findOneAndDelete({_id: taskId}).exec();

        if(!task){
            throw createHttpError(404,"Task not found.");
        } 

        if(!task.userId.equals(authenticatedUserId)){
            throw createHttpError(401, "You cannot access this task.")
        }

        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
}

export const completeTask: RequestHandler = async(req, res, next)=>{
    const{ taskId } = req.params;
    const authenticatedUserId = req.session.userId;
    try{
        assertIsDefined(authenticatedUserId);
        if(!mongoose.isValidObjectId(taskId)){
            throw createHttpError(400, "Invalid Task Id");
        }
        const task = await TaskModel.findById(taskId).exec();
        if(!task){
            throw createHttpError(404, "Task not found");
        }

        if(!task.userId.equals(authenticatedUserId)){
            throw createHttpError(401, "You cannot access this task.")
        }

        task.completed = true;
        const completedTask = await task.save();
        res.status(200).json(completedTask);
        
    }catch(error){
        next(error);
    }
}

