const express = require("express");
const reviewRouter = express.Router();

const companyReviewContoller = require("../controllers/companyReviewController");

reviewRouter.post("/addreview", companyReviewContoller.createReview);

module.exports = reviewRouter;
