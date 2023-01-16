const { Chat, Message } = require("../models");
const { generateRandomColor } = require("../utils");
const socket = require("../socket");
const mongoose = require("mongoose");

// @des Get chat by id
// @route GET /api/chat/detail/:chatId
const getChatById = async (req, res) => {
  try {
    let {
      params: { chatId },
      user: { id },
      query: { limit = 50 },
    } = req;

    id = mongoose.Types.ObjectId(id);
    chatId = mongoose.Types.ObjectId(chatId);

    limit = +limit;

    let chat = await Chat.findById(chatId);

    let isGroupChat = !!chat.group;

    let [data] = await Chat.aggregate([
      {
        $match: { _id: chatId },
      },
      ...(!isGroupChat
        ? [
            {
              $lookup: {
                from: "users",
                foreignField: "_id",
                localField: "users",
                as: "user",
                pipeline: [
                  { $match: { _id: { $ne: id } } },
                  {
                    $project: {
                      name: 1,
                      email: 1,
                      status: 1,
                      avatar: 1,
                      colorCode: 1,
                    },
                  },
                ],
              },
            },
          ]
        : []),
      {
        $project: {
          chatDetails: {
            ...(isGroupChat
              ? {
                  name: "$group.name",
                  avatar: "$group.avatar",
                  colorCode: "$group.colorCode",
                  users: "$users",
                  totalMembers: { $size: "$users" },
                }
              : {
                  name: {
                    $first: "$user.name",
                  },
                  avatar: {
                    $first: "$user.avatar",
                  },
                  colorCode: { $first: "$user.colorCode" },
                  status: { $first: "$user.status" },
                  email: { $first: "$user.email" },
                  userId: { $first: "$user._id" },
                }),
            favourite: {
              $cond: {
                if: { $in: [id, "$favourites"] },
                then: true,
                else: false,
              },
            },
          },
        },
      },
    ]);

    const newMessages = await Message.findOne({
      chatId,
      "seen.user": { $ne: id },
    });

    if (newMessages) {
      const totalUnReadMessages = await Message.find({
        chatId,
        "seen.user": { $ne: id },
      }).countDocuments();

      const unReadMessages = await Message.aggregate([
        {
          $match: {
            chatId,
            "seen.user": { $ne: id },
          },
        },
        {
          $sort: {
            date: 1,
          },
        },
        { $limit: limit },
        ...Message.schema.statics.query({ totalUsers: chat.users.length, id }),
      ]);

      data.hasMoreBottom = totalUnReadMessages > limit;
      data.totalUnReadMsg = totalUnReadMessages;
      data.unReadMsgList = unReadMessages;
    }

    const totalMessages = await Message.find({
      chatId,
      "seen.user": { $eq: id },
    }).countDocuments();

    const messages = await Message.aggregate([
      {
        $match: {
          chatId,
          "seen.user": { $eq: id },
        },
      },
      {
        $sort: {
          date: -1,
        },
      },
      { $limit: limit },
      ...Message.schema.statics.query({ totalUsers: chat.users.length, id }),
    ]);

    data.hasMoreTop = totalMessages > limit;
    data.msgList = messages;
    delete data.chatDetails.messages;

    res.status(200).send({
      message: "Success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

// @des get chat by msgId
// @route get /api/chat/messages/:chatId/:msgId
const getChatMessagesByMsgId = async (req, res) => {
  try {
    let {
      user: { id },
      params: { chatId, msgId },
      query: { limit = 50, latest = 1 } = {},
    } = req;

    id = mongoose.Types.ObjectId(id);
    chatId = mongoose.Types.ObjectId(chatId);
    msgId = mongoose.Types.ObjectId(msgId);

    limit = +limit;
    latest = +latest;

    const chat = await Chat.findById(chatId);

    if (!chat) return res.status(400).send({ message: "Chat Id Not Found" });

    let message = await Message.findById(msgId);

    if (!message)
      return res.status(400).send({ message: "Message Id Not Found" });

    const total = await Message.find({
      chatId,
      date: { [latest ? "$gt" : "$lt"]: message.date },
    }).countDocuments();

    const list = await Message.aggregate([
      {
        $match: {
          chatId,
          date: { [latest ? "$gt" : "$lt"]: message.date },
        },
      },
      ...(!latest ? [{ $sort: { date: -1 } }] : []),
      { $limit: limit },
      ...Message.schema.statics.query({ totalUsers: chat.users.length, id }),
    ]);

    res.status(200).send({
      message: "Success",
      data: {
        list: latest ? list : list.reverse(),
        hasMore: total - limit > 0,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const getChatMessageByRange = async (req, res) => {
  let {
    user: { id },
    params: { chatId },
    query: { startDate, endDate },
  } = req;

  try {
    let chat = await Chat.findById(chatId);

    if (!chat) return res.status(400).send({ message: "Invalid Chat Id" });

    let data = await Message.aggregate([
      {
        $match: {
          chatId: mongoose.Types.ObjectId(chatId),
          date: {
            $gte: new Date(startDate),
            $lt: new Date(endDate),
          },
        },
      },
      ...Message.schema.statics.query({
        totalUsers: chat.users.length,
        id,
        sort: -1,
      }),
    ]);

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error, "error");
  }
};

// @des Get chat by type
// @route GET /api/chat/list/:type
const getChatsByType = async (req, res) => {
  try {
    let {
      user: { id },
      params: { type },
    } = req;

    let data;

    id = mongoose.Types.ObjectId(id);

    if (type === "recent" || type === "favourite") {
      data = await Chat.aggregate([
        {
          $match: {
            users: id,
            latest: { $ne: null },
            group: { $eq: null },
            favourites: { [type === "recent" ? "$ne" : "$eq"]: id },
          },
        },
        {
          $sort: { updatedAt: -1 },
        },
        {
          $lookup: {
            from: "messages",
            localField: "latest",
            foreignField: "_id",
            as: "latest",
            pipeline: [
              {
                $project: {
                  _id: 0,
                  msg: 1,
                  date: 1,
                },
              },
            ],
          },
        },
        {
          $project: {
            latest: {
              $first: "$latest",
            },
            user: {
              $filter: {
                input: "$users",
                as: "user",
                cond: { $ne: ["$$user", id] },
              },
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
            pipeline: [
              {
                $project: {
                  name: 1,
                  email: 1,
                  avatar: 1,
                  colorCode: 1,
                  status: 1,
                },
              },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            msg: "$latest.msg",
            date: "$latest.date",
            userId: { $first: "$user._id" },
            name: { $first: "$user.name" },
            email: { $first: "$user.email" },
            avatar: { $first: "$user.avatar" },
            colorCode: { $first: "$user.colorCode" },
            status: { $first: "$user.status" },
          },
        },
      ]);
    } else if (type === "group") {
      data = await Chat.aggregate([
        {
          $match: {
            users: id,
            latest: { $ne: null },
            group: { $ne: null },
          },
        },
        {
          $lookup: {
            from: "messages",
            localField: "latest",
            foreignField: "_id",
            as: "latest",
            pipeline: [
              {
                $project: {
                  _id: 0,
                  msg: 1,
                  date: 1,
                },
              },
            ],
          },
        },
        {
          $project: {
            latest: {
              $first: "$latest",
            },
            group: 1,
          },
        },
        {
          $project: {
            name: "$group.name",
            avatar: "$group.avatar",
            colorCode: "$group.colorCode",
            msg: "$latest.msg",
            date: "$latest.date",
          },
        },
      ]);
    } else {
      req.status(400).send({ message: "Invalid chat type" });
    }

    for (let i = 0; i < data.length; i++) {
      let chatId = data[i]._id;
      data[i].count = await Message.find({
        chatId,
        "seen.user": { $ne: id },
      }).countDocuments();
    }

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

// @des Create group chat
// @route POST /api/chat/group/create
const createGroupChat = async (req, res) => {
  try {
    const {
      user: { id },
      body,
    } = req;

    body.group.createdBy = id;
    body.group.admin = [id];
    body.group.colorCode = generateRandomColor();

    let data = await Chat.create(body);
    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(200).send({ message: "Error" });
  }
};

const addToFavourite = async (req, res) => {
  let {
    user: { id },
    params: { chatId },
  } = req;
  let chat;

  try {
    chat = await Chat.findById(chatId);

    if (!chat) return res.status(400).send({ message: "Chat Id Not Found" });

    await Chat.findByIdAndUpdate(chatId, {
      $push: {
        favourites: id,
      },
    });

    res.status(200).send({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(200).send({ message: "Error" });
  } finally {
    if (!chat) return;

    let [data] = await Chat.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(chatId) } },
      {
        $lookup: {
          from: "messages",
          foreignField: "_id",
          localField: "latest",
          as: "message",
        },
      },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "users",
          as: "users",
          pipeline: [
            {
              $match: { _id: { $ne: mongoose.Types.ObjectId(id) } },
            },
            {
              $project: {
                _id: 0,
                id: "$_id",
                name: 1,
                email: 1,
                status: 1,
                colorCode: 1,
                avatar: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          user: { $first: "$users" },
          msg: { $first: "$message.msg" },
          date: { $first: "$message.date" },
          _id: chatId,
        },
      },
    ]);

    socket.io.to(id).emit("favourite", data, true, !!data.group);
  }
};

const removeFromFavourite = async (req, res) => {
  let {
    user: { id },
    params: { chatId },
  } = req;
  try {
    const chat = await Chat.findById(chatId);

    if (!chat) return res.status(400).send({ message: "Chat Id Not Found" });

    await Chat.findByIdAndUpdate(chatId, {
      $pull: {
        favourites: id,
      },
    });

    res.status(200).send({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(200).send({ message: "Error" });
  } finally {
    socket.io.to(id).emit("favourite", { _id: chatId }, false);
  }
};

const markAsReadByMsgId = async (req, res) => {
  const {
    user: { id },
    params: { chatId, msgId },
  } = req;
  let chat;
  try {
    chat = await Chat.findById(chatId);

    if (!chat) return res.status(400).send({ message: "Chat Id Not Found" });

    await Message.findByIdAndUpdate(msgId, {
      $push: { seen: { user: id, date: new Date().toISOString() } },
    });

    return res.status(200).send({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  } finally {
    if (!chat) return;
    socket.io.to(chatId).emit("seen", { msgId, userId: id });
  }
};

const markAsRead = async (req, res) => {
  let {
    params: { chatId },
    user: { id },
  } = req;
  let chat, msgId;

  try {
    chat = await Chat.findById(chatId);

    if (!chat) return res.status(400).send({ message: "Chat Id Not Found" });

    msgId = await Message.aggregate([
      {
        $match: {
          chatId: mongoose.Types.ObjectId(chatId),
          "seen.user": { $ne: mongoose.Types.ObjectId(id) },
        },
      },
      {
        $project: {
          id: "$_id",
          _id: 0,
        },
      },
    ]);

    await Message.updateMany(
      {
        chatId,
        "seen.user": { $ne: id },
      },
      {
        $push: {
          seen: {
            user: id,
            date: new Date().toISOString(),
          },
        },
      }
    );

    res.status(200).send({ message: "Success", msgId: msgId.length });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  } finally {
    if (!chat || msgId.length === 0) return;
    socket.io.to(chatId).emit("seen", { msgId, userId: id });
  }
};

const getChatIdByUserId = async (req, res) => {
  let {
    user: { id },
    params: { userId },
  } = req;

  try {
    let chat = await Chat.findOne(
      { users: { $all: [id, userId] } },
      { _id: 1 }
    );

    if (!chat) return res.status(400).send({ message: "Chat Id Not Found" });

    res.status(200).send({ message: "Success", data: chat._id });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

module.exports = {
  getChatsByType,
  getChatMessagesByMsgId,
  getChatById,
  createGroupChat,
  addToFavourite,
  removeFromFavourite,
  markAsReadByMsgId,
  markAsRead,
  getChatIdByUserId,
  getChatMessageByRange,
};
