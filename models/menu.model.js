import mongoose, { model, Schema } from "mongoose";

const menuSchema = new Schema(
  {
    Meal: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

menuSchema.post("find", function (docs) {
  docs.forEach((ele) => {
    console.log(ele);

    ele.restaurant.image = undefined;
  });
});

menuSchema.post("findOne", function (doc) {
  doc.restaurant.image = undefined;
});

export const Menu = model("Menu", menuSchema);
