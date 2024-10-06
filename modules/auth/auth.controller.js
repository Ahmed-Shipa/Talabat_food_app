import { catchError } from "../../middleware/catchError.js";
import { User } from "../../models/user.model.js";
import { AppError } from "../../utilities/appError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// signUp new user
const signUp = catchError(async (req, res, next) => {
  // check email is unique
  const isEmailFound = await User.findOne({ email: req.body.email });
  if (isEmailFound) return next(new AppError(`email already exists`, 409));

  req.body.password = bcrypt.hashSync(req.body.password, 8);
  const user = await User.insertMany(req.body);

  // make the password invisible in the response
  user[0].password = undefined;

  res.status(201).json({ message: `signUp successfully`, user });
});

// login user
const login = catchError(async (req, res, next) => {
  // check if email exists
  const user = await User.findOne({ email: req.body.email });

  // check if password is correct
  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return next(new AppError(`email or password is incorrect`, 401));

  // generating token
  jwt.sign({ userId: user._id, role: user.role }, "userToken", (err, token) => {
    res.status(200).json({ message: `login successfully`, token });
  });
});

// change password
const changePassword = catchError(async (req, res, next) => {
  // check if user exists
  const user = await User.findOne({ email: req.body.email });

  // compare old password to existing password
  if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
    // setting new password
    req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 8);
    await User.findOneAndUpdate(
      { email: req.body.email },
      { password: req.body.newPassword, passwordChangedAt: Date.now() },
      { new: true }
    );

    // generating new token
    jwt.sign(
      { userId: user._id, role: user.role },
      "userToken",
      (err, token) => {
        res
          .status(201)
          .json({ message: `password updated successfully`, token });
      }
    );
  } else {
    return next(new AppError(`incorrect email or password`, 404));
  }
});

// protect routes
const protectedRoutes = catchError(async (req, res, next) => {
  const token = req.headers.token;
  let userPayload = null;

  // check if token is provided
  if (!token) return next(new AppError(`token is not provided`, 401));

  // verify token
  jwt.verify(token, "userToken", (err, payload) => {
    if (err) return next(new AppError(`invalid token`, 401));
    userPayload = payload;
  });

  // check userId in token
  const user = await User.findById(userPayload.userId);
  if (!user) return next(new AppError(`user not found`, 401));

  // check the time of change of password
  if (user.passwordChangedAt) {
    let time = parseInt(user.passwordChangedAt.getTime() / 1000);
    if (time > userPayload.iat) {
      return next(new AppError(`invalid old token`, 401));
    }
  }

  req.user = user;

  next();
});

// Authorization with allowed to
const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (roles.includes(req.user.role)) return next();
    return next(
      new AppError(`you not authorized to access this endpoint`, 401)
    );
  });
};

export { signUp, login, changePassword, protectedRoutes, allowedTo };
