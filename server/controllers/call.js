const { Call, Chat } = require("../models");
const socket = require("../socket");
const mongoose = require("mongoose");

const initiateCall = async (req, res) => {
  const {
    user: { id },
    params: { chatId },
    body: { date, type, offer },
  } = req;
  try {
    if (!date || !type || !offer)
      return res.status(400).send({ message: "Please fill all fields" });

    const chat = await Chat.findById(chatId);

    if (!chat) return res.status(400).send({ message: "Chat Id Not Found" });

    const data = await Call.create({
      users: chat.users,
      chatId,
      date,
      type,
      initiatedBy: id,
    });

    const userId = chat.users.find((user) => user !== id);
    socket.io.to(userId).emit("offer", offer);
    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const callHistory = async (req, res) => {
  let {
    user: { id },
    params: { limit = 25, page = 1 },
  } = req;

  limit = +limit;
  page = +page;
  id = mongoose.Types.ObjectId(id);

  try {
    const data = await Call.aggregate([
      {
        $match: { users: id },
      },
      { $skip: (page - 1) * limit },
      { $limit: limit },
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
                avatar: 1,
                status: 1,
                colorCode: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          user: { $first: "$user" },
          status: 1,
          type: 1,
          chatId: 1,
          initiatedBy: 1,
          date: 1,
        },
      },
    ]);

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  initiateCall,
  callHistory,
};
