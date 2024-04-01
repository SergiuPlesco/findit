import express from "express";
import authController from "../controllers/auth.controller.js";
const authRouter = express.Router();

// Auth user routes
authRouter.post("/users/register", authController.users_register);
authRouter.post("/users/login", authController.users_login);
authRouter.post("/users/forgotpassword", authController.users_forgotpassword);
authRouter.post("/users/resetpassword/:resetToken", authController.users_resetpassword);

export default authRouter;
