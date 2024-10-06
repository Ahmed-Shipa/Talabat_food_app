import { catchError } from "../../middleware/catchError.js";
import { Food } from "../../models/food.model.js";
import fs from "fs";
import path from "path";
import { Restaurant } from "../../models/restaurant.model.js";

// add new restaurant
const addRestaurant = catchError(async (req, res, next) => {
  // set the image
  if (req.file) req.body.image = req.file.filename;

  const restaurant = new Restaurant(req.body);
  await restaurant.save();
  res
    .status(201)
    .json({ message: `restaurant added successfully`, restaurant });
});

// get all restaurants
const getAllRestaurants = catchError(async (req, res, next) => {
  const restaurants = await Restaurant.find().populate("shopHR", "-_id firstName");
  res.status(200).json({ message: `success`, restaurants });
});

// get specific restaurant
const getSpecificRestaurant = catchError(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id).populate("shopHR", "-_id firstName");
  res.status(200).json({ message: `success`, restaurant });
});

// update restaurant
const updateRestaurant = catchError(async (req, res, next) => {
  // confirm there is no old photo
  let destination = path.resolve("uploads/restaurant");
  let file = fs.readdirSync(destination);

  const oldPhoto = await Restaurant.findById(req.params.id);

  if (file.includes(oldPhoto.image)) {
    // determine the path for the old image
    let imagePath = path.resolve(`uploads/restaurant/${oldPhoto.image}`);

    // remove old image
    fs.unlinkSync(imagePath);
  }

  // set the images
  req.body.image = req.file.filename;
  const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res
    .status(200)
    .json({ message: `Restaurant updated successfully`, updatedRestaurant });
});

// delete restaurant
const deleteRestaurant = catchError(async (req, res, next) => {
  // confirm there is no old photos
  let destination = path.resolve("uploads/restaurant");
  let file = fs.readdirSync(destination);

  const oldPhoto = await Restaurant.findById(req.params.id);

  if (file.includes(oldPhoto.image)) {
    // determine the path for the old image
    let imagePath = path.resolve(`uploads/restaurant/${oldPhoto.image}`);

    // remove old image
    fs.unlinkSync(imagePath);
  }

  await Restaurant.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Restaurant deleted successfully` });
});

export {
  addRestaurant,
  getAllRestaurants,
  getSpecificRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
