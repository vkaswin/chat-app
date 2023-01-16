const mongoose = require("mongoose");

const callSchema = mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    date: {
      type: Date,
    },
    type: {
      type: String,
    },
    initiatedBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Call", callSchema);
