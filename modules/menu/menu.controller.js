import { catchError } from "../../middleware/catchError.js";
import { Menu } from "../../models/menu.model.js";

// add new menu
const addMenu = catchError(async (req, res, next) => {
  const menu = new Menu(req.body);
  await menu.save();
  res.status(201).json({ message: `Menu added successfully`, menu });
});

// get all menus
const getAllMenus = catchError(async (req, res, next) => {
  const menus = await Menu.find()
    .populate("Meal", "-_id")
    .populate("restaurant", "-_id RestaurantName");

  res.status(200).json({ message: `success`, menus });
});

// get specific menu
const getSpecificMenu = catchError(async (req, res, next) => {
  const menu = await Menu.findById(req.params.id)
    .populate("Meal", "-_id")
    .populate("restaurant", "-_id RestaurantName");
  res.status(200).json({ message: `success`, menu });
});

// update menu
const updateMenu = catchError(async (req, res, next) => {
  const UpdatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ message: `Menu updated successfully`, UpdatedMenu });
});

// delete menu
const deleteMenu = catchError(async (req, res, next) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Menu deleted successfully` });
});

export { addMenu, getAllMenus, getSpecificMenu, updateMenu, deleteMenu };
