import mongoose, { model, Schema } from "mongoose";

const restaurantSchema = new Schema(
  {
    RestaurantName: String,
    description: String,
    image: String,
    shopHR: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

// use hook to join path with filename
restaurantSchema.post("find", function (docs) {
  docs.forEach((doc) => {
    doc.image = "http://localhost:3000/uploads/restaurant/" + doc.image;
  });
});

restaurantSchema.post("findOneAndUpdate", function (docs) {
  docs.image = "http://localhost:3000/uploads/restaurant/" + docs.image;
});

// use hook to remove any spaces in image name before added in database
restaurantSchema.pre("save", function () {
  if (this.image) this.image = this.image.replace(" ", "-");
});

export const Restaurant = model("Restaurant", restaurantSchema);
