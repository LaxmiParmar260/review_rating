const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/user/create", userController.createUser);
userRouter.post("/user/login", userController.userLogIn);
module.exports = userRouter;
