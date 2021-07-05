import express from "express";
import userController from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
	res.json({ message: "hello" });
});

// User routes
userRouter.get("/users/:userID");

userRouter.put("/users/:userID");
userRouter.delete("/users/:userID");

export default userRouter;
