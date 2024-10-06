import { catchError } from "../../middleware/catchError.js";
import { Food } from "../../models/food.model.js";
import { Order } from "../../models/order.model.js";
import { AppError } from "../../utilities/appError.js";

// add new order
const addOrder = catchError(async (req, res, next) => {
  // get price of food added to order
  const food = await Food.find({ _id: req.body.food });

  const order = new Order(req.body);
  // get the id of user from token
  order.user = req.user._id;

  // set the total price of food
  order.totalPriceOfFood = food.reduce((acc, ele) => {
    // check if there is discount on food
    let price = parseInt(ele.priceAfterDiscount) || parseInt(ele.price);
    price = acc + price;
    return price;
  }, 0);

  order.totalPriceOfFood = order.totalPriceOfFood + "$";
  await order.save();

  res.status(201).json({ message: `Order added successfully`, order });
});

// get all orders
const getAllOrders = catchError(async (req, res, next) => {
  const orders = await Order.find()
    .populate("restaurant", "-_id RestaurantName")
    .populate("food", "-_id mealName")
    .populate("user", "-_id firstName");

  res.status(200).json({ message: `success`, orders });
});

// get all orders for specific user
const getAllOrdersForSpecificUser = catchError(async (req, res, next) => {
  let orders = await Order.find({ user: req.params.id })
    .populate("restaurant", "-_id RestaurantName")
    .populate("food", "-_id mealName")
    .populate("user", "-_id firstName");

  // check if user has orders
  if (orders.length == 0)
    return next(new AppError(`This user has no orders`, 409));

  // get the total price for all orders
  let total = orders.reduce((acc, ele) => {
    let price = parseInt(ele.totalPriceOfFood);
    return acc + price;
  }, 0);

  // check the if number of orders of user exceed 3 orders and apply discount by 30%
  if (orders.length >= 3) {
    // apply discount
    total = total - total * (30 / 100);

    res.status(200).json({
      message: `success`,
      totalOrdersPrice: `${total}$`,
      DiscountApplied: "30%",
      orders,
    });
  } else {
    // in case user has less than 3 orders
    res
      .status(200)
      .json({ message: `success`, totalOrdersPrice: `${total}$`, orders });
  }
});

// get specific order
const getSpecificOrder = catchError(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("restaurant", "-_id RestaurantName")
    .populate("food", "-_id mealName")
    .populate("user", "-_id firstName");
  res.status(200).json({ message: `success`, order });
});

// updateOrder
const updateOrder = catchError(async (req, res, next) => {
  const UpdatedOrder = await Order.findOneAndUpdate(
    { user: req.user._id },
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({ message: `Order updated successfully`, UpdatedOrder });
});

// delete order
const deleteOrder = catchError(async (req, res, next) => {
  await Order.findOneAndDelete({ user: req.user._id });
  res.status(200).json({ message: `Order deleted successfully` });
});

export {
  addOrder,
  getAllOrders,
  getSpecificOrder,
  updateOrder,
  deleteOrder,
  getAllOrdersForSpecificUser,
};
