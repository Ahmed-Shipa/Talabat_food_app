import { authRouter } from "./modules/auth/auth.routes.js";
import { foodRouter } from "./modules/food/food.routes.js";
import { menuRouter } from "./modules/menu/menu.routes.js";
import { orderRouter } from "./modules/order/order.routes.js";
import { restaurantRouter } from "./modules/restaurant/restaurant.routes.js";
import { userRouter } from "./modules/user/user.routes.js";
import { wishlistRouter } from "./modules/wishlist/wishlist.routes.js";

export const routes = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);
  app.use("/api/food", foodRouter);
  app.use("/api/restaurant", restaurantRouter);
  app.use("/api/menu", menuRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/wishlist", wishlistRouter);
};
