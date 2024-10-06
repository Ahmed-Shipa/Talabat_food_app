// handling programming errors
process.on("uncaughtException", () => {
  console.log("error in code");
});

import express from "express";
import { dbConnection } from "./dbConnection/dbConnection.js";
import { AppError } from "./utilities/appError.js";
import { globalError } from "./middleware/globalError.js";
import { routes } from "./index.routes.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// main routes in application
routes(app);

// handling of unhandled routes
app.use("*", (req, res, next) => {
  next(new AppError(`route not found ${req.originalUrl}`));
});

// error handling middleware
app.use(globalError);

// handle errors outside express
process.on("unhandledRejection", (err) => {
  console.log("error", err);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
