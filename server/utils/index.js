const jwt = require("jsonwebtoken");

const generateJwtToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const generateRandomColor = () => {
  const colors = [
    "#EF4770",
    "#6F6F6F",
    "#DCB604",
    "#199393",
    "#029ACD",
    "#11C1DA",
    "#3B8FFC",
    "#18C6A0",
    "#B387FF",
    "#F75334",
  ];

  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

const getPagination = ({ list, page, limit, total }) => {
  return {
    pageMeta: {
      limit,
      page,
      total,
      totalPages: Math.ceil(total / limit),
    },
    list,
  };
};

module.exports = {
  generateJwtToken,
  generateRandomColor,
  getPagination,
};
