const express = require("express");

const userRouter = require("../routes/userRoutes");
const reviewRouter = require("./companyReviewRoutes");
const companyRouter = require("../routes/companyRoutes");

const commonRouter = express.Router();

commonRouter.use("/user", userRouter);
commonRouter.use("/review", reviewRouter);
commonRouter.use("/company", companyRouter);

module.exports = commonRouter;
