const mongoose = require("mongoose");

const contactScheme = mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactScheme);
