const { Status, Contact } = require("../models");
const mongoose = require("mongoose");
const user = require("../models/user");
const { getPagination } = require("../utils");

const createStatus = async (req, res) => {
  let {
    user: { id },
    body,
  } = req;

  try {
    let data = await Status.create({ ...body, user: id });
    console.log(data);
    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const getAllStatus = async (req, res) => {
  let {
    user: { id },
    query: { page = 1, limit = 25 },
  } = req;

  page = +page;
  limit = +limit;

  try {
    let total = await Contact.find({ addedBy: id }).countDocuments();

    let list = await Contact.aggregate([
      {
        $match: { addedBy: mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "status",
          foreignField: "user",
          localField: "user",
          as: "status",
          pipeline: [
            {
              $project: {
                seen: 1,
                url: 1,
                date: 1,
              },
            },
          ],
        },
      },
      {
        $match: {
          status: { $ne: [] },
        },
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
          user: { $first: "$user" },
          chatId: 1,
          status: 1,
        },
      },
    ]);

    res.status(200).send({
      message: "Success",
      data: getPagination({ limit, page, list, total }),
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

module.exports = {
  createStatus,
  getAllStatus,
};
