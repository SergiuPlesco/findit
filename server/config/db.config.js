import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbURL = process.env.dbURL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL, {});
    console.log("Connected to DB FindIt");
  } catch (error) {
    console.log(`ERROR conntecting to DB: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
