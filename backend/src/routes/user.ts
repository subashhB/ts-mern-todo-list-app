import express from "express";
import * as UserController from "../controllers/userController";

const router = express.Router();

router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);


export default router;
