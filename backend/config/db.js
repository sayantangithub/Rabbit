const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.error("Mongodb connection failed");
    process.exit(1);
  }
};
module.exports = connectDB;
