const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI
        : process.env.MONGO_URI_DEV;
    let res = await mongoose.connect(mongoURI);
    console.log(`Mongo DB Connected`, res.connection.host);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
