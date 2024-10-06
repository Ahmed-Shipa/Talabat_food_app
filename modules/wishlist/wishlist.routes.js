import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addWishlist, deleteWishlist, getWishlist, updateWishlist } from "./wishlist.controller.js";
import { checkWishlist } from "../../middleware/checkWishlist.js";

export const wishlistRouter = Router();

wishlistRouter
  .route("/")
  .post(protectedRoutes, allowedTo("admin", "shop_HR", "user"), addWishlist);

wishlistRouter
  .route("/:id")
  .get(protectedRoutes, allowedTo("admin", "shop_HR", "user"),checkWishlist, getWishlist)
  .put(protectedRoutes, allowedTo("admin", "shop_HR", "user"), checkWishlist,updateWishlist)
  .delete(protectedRoutes, allowedTo("admin", "shop_HR", "user"), checkWishlist,deleteWishlist)
