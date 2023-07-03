const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  {
    timestamps: true
  }
);


module.exports = model("Favorite", favoriteSchema);
