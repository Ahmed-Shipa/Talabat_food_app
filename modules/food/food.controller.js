import { catchError } from "../../middleware/catchError.js";
import { Food } from "../../models/food.model.js";
import fs from "fs";
import path from "path";

// add new food
const addFood = catchError(async (req, res, next) => {
  // set the images
  req.body.images = req.files.images.map((val) => val.filename);

  const food = new Food(req.body);

  if (food.discount) {
    // get the original price and discount
    let price = parseInt(food.price);
    let discount = parseInt(food.discount);

    // apply discount on food price
    price = price - (price * discount) / 100;
    food.priceAfterDiscount = price + "$";
  }

  await food.save();
  res.status(201).json({ message: `food added successfully`, food });
});

// get all food
const getAllFood = catchError(async (req, res, next) => {
  const food = await Food.find().populate(
    "restaurant",
    "-_id -description -image"
  );
  res.status(200).json({ message: `success`, food });
});

// get specific food
const getSpecificFood = catchError(async (req, res, next) => {
  const food = await Food.findById(req.params.id).populate(
    "restaurant",
    "-_id -description -image"
  );
  res.status(200).json({ message: `success`, food });
});

// update food
const updateFood = catchError(async (req, res, next) => {
  // confirm there is no old photos
  let destination = path.resolve("uploads/food");
  let file = fs.readdirSync(destination);

  const oldPhoto = await Food.findById(req.params.id);
  if (oldPhoto.images)
    oldPhoto.images.forEach((img) => {
      if (file.includes(img)) {
        // determine the path for the old image
        let imagePath = path.resolve(`uploads/food/${img}`);

        // remove old image
        fs.unlinkSync(imagePath);
      }
    });

  // set the images
  req.body.images = req.files.images.map((val) => val.filename);
  const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ message: `food updated successfully`, updatedFood });
});

// delete food
const deleteFood = catchError(async (req, res, next) => {
  // confirm there is no old photos
  let destination = path.resolve("uploads/food");
  let file = fs.readdirSync(destination);

  const oldPhoto = await Food.findById(req.params.id);
  if (oldPhoto.images)
    oldPhoto.images.forEach((img) => {
      if (file.includes(img)) {
        // determine the path for the old image
        let imagePath = path.resolve(`uploads/food/${img}`);

        // remove old image
        fs.unlinkSync(imagePath);
      }
    });

  await Food.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `food deleted successfully` });
});

export { addFood, getAllFood, getSpecificFood, updateFood, deleteFood };
