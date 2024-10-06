import mongoose, { model, Schema } from "mongoose";

const foodSchema = new Schema(
  {
    mealName: {
      type: String,
    },
    description: String,
    images: [String],
    price: String,
    discount: String,
    priceAfterDiscount: String,
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

// use hook to join path with filename
foodSchema.post("find", function (docs) {
  docs.forEach((doc) => {
    doc.restaurant.image = undefined;
    if (doc.images)
      doc.images = doc.images.map((val) => {
        return (val = "http://localhost:3000/uploads/food/" + val);
      });
  });
});

foodSchema.post("findOne", function (doc) {
  doc.restaurant.image = undefined;
  doc.images = doc.images.map((val) => {
    return (val = "http://localhost:3000/uploads/food/" + val);
  });
});

// use hook to remove any spaces in image name before added in database
foodSchema.pre("save", function () {
  this.images = this.images.map((doc) => {
    return (doc = doc.replace(" ", "-"));
  });
});

export const Food = model("Food", foodSchema);
