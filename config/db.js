require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDb is connected successfuly `);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
