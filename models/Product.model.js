const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      scale: 2,
      required: true,
    },
    category: {
      type: String,
    },
    rating: {
      type: Number,
    },
    image: {
      type: String,
      default: "../public/images/no-product.png",
    },
    quantity: {
      type: Number,
      min: 0,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
