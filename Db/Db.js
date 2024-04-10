const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.mongoURI;

let connection;

const connectDb = async () => {
  if (connection) {
    return connection;
  }

  try {
    const dbConnection = await mongoose.connect(mongoURI);
    connection = dbConnection;
    console.log("Connected to MongoDB");
    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = connectDb;
