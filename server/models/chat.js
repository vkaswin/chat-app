const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    users: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
        },
      ],
    },
    group: {
      type: {
        name: { type: String },
        avatar: { type: String },
        colorCode: { type: String },
        description: { type: String },
        admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        createdAt: { type: Date },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
      default: null,
      _id: false,
    },
    favourites: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
        },
      ],
      default: [],
    },
    latest: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);
