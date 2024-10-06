import { Router } from "express";
import { changePassword, login, signUp } from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/signUp", signUp);
authRouter.post("/login", login);
authRouter.patch("/changePassword", changePassword);
