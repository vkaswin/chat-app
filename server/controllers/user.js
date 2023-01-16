const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { generateRandomColor, generateJwtToken } = require("../utils");
const socket = require("../socket");
const jwt = require("jsonwebtoken");

// @des register user
// @route POST /api/user/register
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).send({ message: "Please add all fields" });
    }

    let existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).send({ message: "User already exists" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      colorCode: generateRandomColor(),
    });

    res.status(200).send({
      message: "User registerd successfully",
      data: {
        name: user.name,
        email: user.email,
        id: user._id,
        avatar: user.avatar,
        colorCode: user.colorCode,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

// @des login user
// @route POST /api/user/login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send({ message: "Please add all fields" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "User not exist" });
    }

    let checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).send({ message: "Wrong Password" });
    }

    res.status(200).send({
      message: "Login success",
      token: generateJwtToken({
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        colorCode: user.colorCode,
      }),
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

// @des login user
// @route POST /api/user/:userId
const getUserById = async (req, res) => {
  try {
    const {
      params: { userId },
    } = req;

    let data = await User.findById(
      userId,
      "name email colorCode avatar status"
    );

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const {
      user: { id },
      query: { limit, page },
    } = req;

    let data = await User.aggregate([
      {
        $match: {
          _id: { $ne: id },
        },
      },
      {
        $sort: {
          name: 1,
        },
      },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $project: {
          name: 1,
          email: 1,
          avatar: 1,
          colorCode: 1,
          status: 1,
        },
      },
    ]);

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const searchUsers = async (req, res) => {
  let {
    user: { id },
    query: { search, limit, page },
  } = req;

  try {
    limit = +limit;
    page = +page;

    let data = await User.aggregate([
      {
        $match: {
          _id: { $ne: id },
          $or: [
            {
              name: { $regex: search, $options: "i" },
            },
            {
              email: { $regex: search, $options: "i" },
            },
          ],
        },
      },
      { $sort: { name: 1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $project: {
          name: 1,
          email: 1,
          avatar: 1,
          colorCode: 1,
          status: 1,
        },
      },
    ]);

    res.status(200).send({ message: "Success", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

module.exports = {
  register,
  login,
  getUserById,
  getAllUsers,
  searchUsers,
};
