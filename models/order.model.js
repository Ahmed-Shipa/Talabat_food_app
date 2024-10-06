import mongoose, { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    food: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: String,
    mobile_number: Number,
    totalPriceOfFood: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

orderSchema.post("find", function (docs) {
  if (docs)
    docs.forEach((ele) => {
      if (ele.restaurant.image) ele.restaurant.image = undefined;
    });
});

orderSchema.post("findOne", function (doc) {
  doc.restaurant.image = undefined;
});

export const Order = model("Order", orderSchema);
