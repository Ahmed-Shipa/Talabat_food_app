import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import {
  addOrder,
  deleteOrder,
  getAllOrders,
  getAllOrdersForSpecificUser,
  getSpecificOrder,
  updateOrder,
} from "./order.controller.js";
import { checkTime } from "../../middleware/checkTime.js";

export const orderRouter = Router();

orderRouter
  .route("/")
  .post(protectedRoutes, allowedTo("user", "admin", "shop_HR"), addOrder)
  .put(
    protectedRoutes,
    allowedTo("user", "admin", "shop_HR"),
    checkTime("update"),
    updateOrder
  )
  .delete(
    protectedRoutes,
    allowedTo("user", "admin", "shop_HR"),
    checkTime("delete"),
    deleteOrder
  );

orderRouter.get("/orders", protectedRoutes, allowedTo("shop_HR"), getAllOrders);
orderRouter.get("/orders/:id", protectedRoutes, allowedTo("shop_HR"), getAllOrdersForSpecificUser);

orderRouter
  .route("/:id")
  .get(
    protectedRoutes,
    allowedTo("user", "admin", "shop_HR"),
    getSpecificOrder
  );
