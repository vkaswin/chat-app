const mongoose = require("mongoose");
const { generateRandomColor } = require("../utils");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: null,
    },
    colorCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
