import express from "express";
import userController from "../controllers/user.controller.js";
const userRouter = express.Router();

// User routes
userRouter.get("/users/:userID", userController.user_account_details);
userRouter.put("/users/:userID", userController.user_account_update_details);
userRouter.delete("/users/:userID", userController.user_account_delete);

export default userRouter;
