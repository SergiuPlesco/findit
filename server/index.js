import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.config.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";
import publicRouter from "./routes/public.routes.js";
import { uploadFolderName } from "./constants/constants.js";

const PORT = process.env.PORT || 3001;

const app = express();
//

// Middlewares
app.use(cors());
app.use(express.json({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/images", express.static(`${uploadFolderName}`));
// Routes
app.use(authRouter);
app.use(userRouter);
app.use(companyRouter);
app.use(publicRouter);

connectDB().then(() => {
  app.listen(PORT, (error) => {
    if (error) {
      console.log("An error has occured", error);
    }
    console.log("FindIt App listening on port: " + PORT);
  });
});
