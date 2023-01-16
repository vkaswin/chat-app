const mongoose = require("mongoose");
const { Contact, Chat, User } = require("../models");

// @des get all contacts
// @route POST /api/contact
const getContact = async (req, res) => {
  try {
    let {
      user: { id },
    } = req;

    id = mongoose.Types.ObjectId(id);

    let data = await Contact.aggregate([
      {
        $match: { addedBy: id },
      },
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "user",
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
          user: {
            $first: "$user",
          },
          chatId: 1,
        },
      },
      {
        $project: {
          chatId: 1,
          word: { $toUpper: { $substr: ["$user.name", 0, 1] } },
          name: "$user.name",
          email: "$user.email",
          avatar: "$user.avatar",
          status: "$user.status",
          colorCode: "$user.colorCode",
          userId: "$user._id",
        },
      },
      {
        $sort: {
          name: 1,
        },
      },
      {
        $group: {
          _id: "$word",
          users: {
            $push: {
              _id: "$_id",
              chatId: "$chatId",
              name: "$name",
              email: "$email",
              avatar: "$avatar",
              colorCode: "$colorCode",
              status: "$status",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          users: 1,
          word: "$_id",
        },
      },
      {
        $sort: {
          word: 1,
        },
      },
    ]);

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

// @des add contact
// @route POST /api/contact
const createContact = async (req, res) => {
  try {
    const {
      body: { userId },
      user: { id },
    } = req;

    if (!mongoose.isValidObjectId(id))
      return res.status(200).send({ message: "Invalid Id" });

    const user = await User.findById(userId);

    if (!user) return res.status(400).send({ message: "User Not Found" });

    const chat = await Chat.findOne({
      group: { $eq: null },
      users: { $all: [userId, id] },
    });

    if (!chat) {
      const { _id } = await Chat.create({ users: [userId, id] });
      req.chatId = _id;
    }

    const isExist = await Contact.findOne({ addedBy: id, user: userId });

    if (isExist)
      return res
        .status(200)
        .send({ message: "Contact has been added already" });

    const data = await Contact.create({
      addedBy: id,
      user: userId,
      chatId: chat ? chat._id : req.chatId,
    });

    res.status(200).send({ message: "Success", data: data.toObject() });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

// @des remove contact
// @route DELETE /api/contact/:contactId
const deleteContact = async (req, res) => {
  try {
    const {
      params: { contactId },
    } = req;

    await Contact.findByIdAndDelete(contactId);

    res.status(200).send({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

module.exports = {
  getContact,
  createContact,
  deleteContact,
};
