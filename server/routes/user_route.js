import express from "express";
import { register, login } from "../controllers/auth_controller.js"

export const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

