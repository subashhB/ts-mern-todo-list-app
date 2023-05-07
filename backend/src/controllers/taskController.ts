import { RequestHandler } from "express";
import TaskModel from "../models/task";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getAllTasks: RequestHandler = async (req,res,next)=>{
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

interface CreateTaskBody{
    title?: string,
    description?: string,
}

export const createTask: RequestHandler<unknown, unknown, CreateTaskBody, unknown> = async(req, res, next) =>{
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

interface UpdateTaskParams{
    taskId: string,
}

interface UpdateTaskBody{
    title?: string,
    description?: string,
    completed: boolean,
}

export const updateTask: RequestHandler<UpdateTaskParams, unknown, UpdateTaskBody, unknown> = async(req, res, next) =>{
    const { taskId } = req.params;
    const { title: newTitle, description: newDescription, completed: newStatus } = req.body;
    console.log(req.body)
    try {
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
        
        task.title = newTitle;
        task.description = newDescription;
        task.completed = newStatus;
        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
}

export const deleteTask: RequestHandler = async(req, res, next) =>{
    const { taskId } = req.params;
    try {
        if(!mongoose.isValidObjectId(taskId)){
            throw createHttpError(400,"Invalid Task Id");
        }

        const task = await TaskModel.findOneAndDelete({_id: taskId}).exec();

        if(!task){
            throw createHttpError(404,"Task not found.");
        } 

        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
}

