const { mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongoDB_URI);
    console.log("mongoose connected successfully", conn.connection.name);
  } catch (error) {
    throw new error("mongoose connection failed");
  }
};

module.exports = connectDB;
