const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Admin", adminSchema);
