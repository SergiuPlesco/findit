import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbURL = process.env.dbURL;

const connectDB = async () => {
	await mongoose.connect(dbURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	});
	console.log("Connected to DB");
};

export default connectDB;
