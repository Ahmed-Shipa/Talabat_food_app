import { Wishlist } from "../models/wishlist.model.js";
import { AppError } from "../utilities/appError.js";

export const checkWishlist = async (req, res, next) => {
  // check if user has a wishlist
  const wishlistExists = await Wishlist.findOne({ user: req.user._id });
  if (!wishlistExists) return next(new AppError(`you have no wishlist`, 409));
  next();
};
