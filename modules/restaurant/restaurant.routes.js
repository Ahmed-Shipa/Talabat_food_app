import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import {
  addRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  getSpecificRestaurant,
  updateRestaurant,
} from "./restaurant.controller.js";

export const restaurantRouter = Router();

restaurantRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin", "shop_HR"),
    uploadSingleFile("image", "restaurant"),
    addRestaurant
  );

restaurantRouter.get("/restaurants", getAllRestaurants);

restaurantRouter
  .route("/:id")
  .get(getSpecificRestaurant)
  .put(
    protectedRoutes,
    allowedTo("admin", "shop_HR"),
    uploadSingleFile("image", "restaurant"),
    updateRestaurant
  )
  .delete(protectedRoutes, allowedTo("admin", "shop_HR"), deleteRestaurant);
