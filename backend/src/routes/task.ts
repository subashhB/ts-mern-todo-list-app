import express from "express";
import * as NotesController from "../controllers/taskController";

const router = express.Router();

router.get("/", NotesController.getTasks);
router.post("/", NotesController.createTask);
router.get("/:taskId", NotesController.getTaskById);

export default router;