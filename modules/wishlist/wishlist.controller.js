import { catchError } from "../../middleware/catchError.js";
import { Wishlist } from "../../models/wishlist.model.js";
import { AppError } from "../../utilities/appError.js";

// add new wishlist
const addWishlist = catchError(async (req, res, next) => {
  // check if user have already a wishlist
  const wishlistExists = await Wishlist.findOne({ user: req.user._id });
  if (wishlistExists) return next(new AppError(`you have already a wishlist`, 409));

  const wishlist = new Wishlist(req.body);
  wishlist.user = req.user._id;
  await wishlist.save();
  res.status(201).json({ message: `Wishlist added successfully`, wishlist });
});

// get wishlist
const getWishlist = catchError(async (req, res, next) => {
  // check if user has wishlist in middleware
  const wishlist = await Wishlist.findById(req.params.id)
    .populate("Meal", "-_id mealName")
    .populate("user", "-_id firstName");
  res.status(200).json({ message: `success`, wishlist });
});

// update wishlist
const updateWishlist = catchError(async (req, res, next) => {
    // check if user has wishlist in middleware
  const updatedWishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ message: `Wishlist updated successfully`, updatedWishlist });
});

// delete wishlist
const deleteWishlist = catchError(async (req, res, next) => {
    // check if user has wishlist in middleware
  await Wishlist.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Wishlist deleted successfully` });
});

export { addWishlist, getWishlist ,updateWishlist,deleteWishlist};
