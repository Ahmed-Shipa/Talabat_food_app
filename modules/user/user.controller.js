import { catchError } from "../../middleware/catchError.js";
import { User } from "../../models/user.model.js";
import bcrypt from "bcrypt";
import { AppError } from "../../utilities/appError.js";

// add new user
const addUser = catchError(async (req, res, next) => {
  // check email is unique
  const isEmailFound = await User.findOne({ email: req.body.email });
  if (isEmailFound) return next(new AppError(`email already exists`, 409));

  req.body.password = bcrypt.hashSync(req.body.password, 8);
  const user = await User.insertMany(req.body);

  // make the password invisible in the response
  user[0].password = undefined;

  res.status(201).json({ message: `signUp successfully`, user });
});

// get specific user
const getSpecificUser = catchError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  console.log(req.user);

  //make the password invisible in response
  user.password = undefined;
  res.status(200).json({ user });
});

// get all users
const getUsers = catchError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ users });
});

// update user
const updateUser = catchError(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });

  //make the password invisible in response
  updatedUser.password = undefined;

  res.status(201).json({ message: `user updated successfully`, updatedUser });
});

// delete user
const deleteUser = catchError(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(201).json({ message: `user deleted successfully` });
});

export { addUser, getSpecificUser, updateUser, deleteUser, getUsers };
