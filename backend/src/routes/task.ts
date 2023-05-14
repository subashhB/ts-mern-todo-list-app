import express from "express";
import * as TaskController from "../controllers/taskController";

const router = express.Router();

//Routes for the every task api
router.get("/", TaskController.getAllTasks);
router.get("/:taskId", TaskController.getTaskById);
router.post("/", TaskController.createTask);
router.patch("/:taskId", TaskController.updateTask);
router.delete("/:taskId", TaskController.deleteTask);
router.patch('/complete/:taskId', TaskController.completeTask);

export default router;