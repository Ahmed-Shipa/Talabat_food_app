import { Router } from "express";
import { addUser, deleteUser, getSpecificUser, getUsers, updateUser } from "./user.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

export const userRouter = Router();

userRouter
  .route("/")
  .post(protectedRoutes, allowedTo("admin"), addUser)
  .get(protectedRoutes, allowedTo("user", "shop_HR"), getSpecificUser)
  .put(protectedRoutes, allowedTo("user", "shop_HR"), updateUser);

userRouter.get("/users", protectedRoutes, allowedTo("admin"), getUsers);
userRouter.delete("/:id", protectedRoutes, allowedTo("admin"), deleteUser);
