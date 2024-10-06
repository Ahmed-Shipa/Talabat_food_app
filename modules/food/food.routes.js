import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import {
  addFood,
  deleteFood,
  getAllFood,
  getSpecificFood,
  updateFood,
} from "./food.controller.js";
import { uploadMixOfFiles } from "../../fileUpload/fileUpload.js";

export const foodRouter = Router();

foodRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin", "shop_HR"),
    uploadMixOfFiles([{ name: "images", maxCount: 8 }], "food"),
    addFood
  );

foodRouter.get("/foods", getAllFood);

foodRouter
  .route("/:id")
  .get(getSpecificFood)
  .put(
    protectedRoutes,
    allowedTo("admin", "shop_HR"),
    uploadMixOfFiles([{ name: "images", maxCount: 8 }], "food"),
    updateFood
  )
  .delete(protectedRoutes, allowedTo("admin", "shop_HR"), deleteFood);
