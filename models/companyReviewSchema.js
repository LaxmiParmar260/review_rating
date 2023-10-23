const mongoose = require("mongoose");

const companyReviewSchema = mongoose.Schema({
  companyReviewSubject: {
    type: String,
    required: true,
  },
  companyReview: {
    type: String,
    required: true,
  },
  companyReviewRating: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  isActive: {
    type: String,
    default: true,
  },
});
//UpdatedAt and CreatedAt
companyReviewSchema.set("timestamps", true);

module.exports = mongoose.model("review", companyReviewSchema);
