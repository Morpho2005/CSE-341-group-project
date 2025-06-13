const mongoose = require('mongoose');
require('dotenv').config();

const uri =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit the process after one failure
  }
};

// Connect to MongoDB
module.exports = connectDB;
