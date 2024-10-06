import { Router } from "express";
import {
  addMenu,
  deleteMenu,
  getAllMenus,
  getSpecificMenu,
  updateMenu,
} from "./menu.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

export const menuRouter = Router();

menuRouter.route("/").post(protectedRoutes, allowedTo("shop_HR"), addMenu);

menuRouter.get("/menus", getAllMenus);

menuRouter
  .route("/:id")
  .get(getSpecificMenu)
  .put(protectedRoutes, allowedTo("shop_HR"), updateMenu)
  .delete(protectedRoutes, allowedTo("shop_HR"), deleteMenu);
