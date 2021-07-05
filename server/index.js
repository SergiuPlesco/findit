// Packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// Files
import connectDB from "./config/db.config.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
// Variables
const PORT = process.env.PORT || 3001;

const app = express();

connectDB();
// Middlewares
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(userRouter);

app.listen(PORT, (error) => {
	if (error) {
		console.log("An error has occured", error);
	}
	console.log("FindIt App listening on port: " + PORT);
});
