import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "shop_HR"],
    },
    passwordChangedAt: Date,
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const User = model("User", userSchema);
