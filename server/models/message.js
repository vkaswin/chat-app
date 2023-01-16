const mongoose = require("mongoose");

const messageScheme = mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
    },
    msg: {
      type: String,
    },
    date: {
      type: Date,
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
    reply: {
      type: mongoose.Schema.Types.ObjectId,
    },
    reactions: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
          },
          date: {
            type: mongoose.Schema.Types.Date,
          },
          reaction: {
            type: mongoose.Schema.Types.String,
          },
        },
      ],
      default: [],
      _id: false,
    },
  },
  { timestamps: true }
);

messageScheme.statics.query = function ({ totalUsers, id, sort = 1 }) {
  return [
    {
      $lookup: {
        from: "messages",
        localField: "reply",
        foreignField: "_id",
        as: "reply",
        pipeline: [
          {
            $project: {
              msg: 1,
              date: 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "sender",
        foreignField: "_id",
        as: "sender",
        pipeline: [
          {
            $project: {
              id: "$_id",
              _id: 0,
              name: 1,
              avatar: 1,
              colorCode: 1,
              status: 1,
              email: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        day: {
          $dateToString: {
            date: "$date",
            format: "%Y-%m-%d",
          },
        },
      },
    },
    {
      $sort: {
        day: 1,
        date: 1,
      },
    },
    {
      $group: {
        _id: "$day",
        messages: {
          $push: {
            _id: "$_id",
            chatId: "$chatId",
            sender: {
              $first: "$sender",
            },
            reply: { $first: "$reply" },
            msg: "$msg",
            seen: "$seen",
            date: "$date",
            totalReactions: { $size: "$reactions" },
            reactions: {
              $function: {
                body: `function (reactions) {
                  return reactions.reduce((value, { reaction }) => {
                    if (value.hasOwnProperty(reaction)) {
                      return { ...value, [reaction]: value[reaction] + 1 };
                    } else {
                      return { ...value, [reaction]: 1 };
                    }
                  }, {});
                }`,
                args: ["$reactions"],
                lang: "js",
              },
            },
            reacted: {
              $cond: {
                if: {
                  $in: [mongoose.Types.ObjectId(id), "$reactions.user"],
                },
                then: { $first: "$reactions.reaction" },
                else: null,
              },
            },
            seen: {
              $cond: {
                if: { $eq: [{ $size: "$seen" }, totalUsers] },
                then: true,
                else: false,
              },
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        day: "$_id",
        messages: 1,
      },
    },
    {
      $sort: {
        day: sort,
      },
    },
  ];
};

module.exports = mongoose.model("Message", messageScheme);
