const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required : true,
  },
  userPhone: {
    type: Number,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userCity: {
    type: String,
    required: true,
  },
  userState: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    default: "user",
  },
   profilePic: {
    type: String,
    default :true,
   },
  isActive: {
    type: String,
    default: true,
  },
});
//this line for updatedAt and createdAt
userSchema.set("timestamps", true);

module.exports = mongoose.model("user", userSchema);
