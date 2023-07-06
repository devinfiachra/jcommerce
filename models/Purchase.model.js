const { Schema, model } = require("mongoose");

const purchaseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    price: {
      type: Number
    },
    shippingAddress: {
      name: {type: String},
      street: {type: String},
      city: {type: String},
      country: {type: String}
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
