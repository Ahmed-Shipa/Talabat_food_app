import { Order } from "../models/order.model.js";
import { AppError } from "../utilities/appError.js";

export const checkTime = (action) => {
  return async (req, res, next) => {
    let order = await Order.findOne({ user: req.user._id });

    // get the time the order created
    let timeOfOrder =
      order.createdAt.getHours() * 60 + order.createdAt.getMinutes();

    // get the date now
    let dateNow = new Date();
    dateNow = dateNow.getHours() * 60;

    // check if the time exceed 15 minutes
    if (dateNow - timeOfOrder > 15)
      return next(new AppError(`sorry timeout to ${action} this order`));
    next();
  };
};
