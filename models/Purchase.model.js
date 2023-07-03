const { Schema, model } = require("mongoose");

const purchaseSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    price: {
      type: Number
    },
    shippingAddress: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
  },
  {
    timestamps: true
  }
);


module.exports = model("Purchase", purchaseSchema);
