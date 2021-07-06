import express from "express";
import userController from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
const userRouter = express.Router();

// User routes
userRouter.get("/users/:userID", authorize, userController.user_account_details);
userRouter.put("/users/:userID", authorize, userController.user_account_update_details);
userRouter.delete("/users/:userID", authorize, userController.user_account_delete);

export default userRouter;
