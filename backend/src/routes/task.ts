import express from "express";
import * as TaskController from "../controllers/taskController";

const router = express.Router();

//Routes for the every task api
router.get("/", TaskController.getTasks);
router.get("/:taskId", TaskController.getTaskById);
router.post("/", TaskController.createTask);
router.patch("/:taskId", TaskController.updateTask);
router.delete("/:taskId", TaskController.deleteTask);

export default router;