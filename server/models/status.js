const mongoose = require("mongoose");

const statusSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
    url: {
      type: mongoose.Schema.Types.String,
    },
    seen: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
          },
          date: {
            type: mongoose.Schema.Types.Date,
          },
        },
      ],
      default: [],
      _id: false,
    },
    date: {
      type: mongoose.Schema.Types.Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Status", statusSchema);
