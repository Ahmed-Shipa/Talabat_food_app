import mongoose, { model, Schema } from "mongoose";

const wishlistSchema = new Schema(
  {
    Meal: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

export const Wishlist = model("Wishlist", wishlistSchema);
