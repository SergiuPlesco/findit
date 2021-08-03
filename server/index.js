// Packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// Files
import connectDB from "./config/db.config.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";
import publicRouter from "./routes/public.routes.js";
// Variables
const PORT = process.env.PORT || 3001;

const app = express();

connectDB();
// Middlewares
app.use(cors());
app.use(express.json({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(authRouter);
app.use(userRouter);
app.use(companyRouter);
app.use(publicRouter);

app.listen(PORT, (error) => {
	if (error) {
		console.log("An error has occured", error);
	}
	console.log("FindIt App listening on port: " + PORT);
});
