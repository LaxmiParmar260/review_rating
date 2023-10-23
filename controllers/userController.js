let userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
//here we are using jwt for token
const jwt = require("jsonwebtoken");
const { transporter } = require("../services/emailService");
//for create user 
let createUser = async (req, res) => {
  const userData = new userSchema(req.body);
  try {
    const isUserExists = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExists) {
      //for removing the unexist user profile
      req.file ? unlinkSync(req.file.path) : null;
      res.status(409).json({
        success: false,
        message: "User is already registered with this email",
      });
    } else {
      //for encryption of password
      const salt = await bcrypt.genSalt(10);
      userData.userPassword = await bcrypt.hash(req.body.userPassword, salt);
      //for profile pic
      const filePath = `/uploads/user/${req.file.filename}`;
      userData.profilePic = filePath;
      const user = await userData.save();
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        createUser: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

// for dycription of password
//user can login with previous email and password
const userLogIn = async (req, res) => {
  try {
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (userData) {
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        userData.userPassword
      );
      //for generating token
      if (userData && hashPassword) {
        const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({
          success: true,
          message: " User logged in successfully",
          accessToken: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "User is not reconized with this email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

// send email 
const sendUserPasswordEmail = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (userData != null) {
      const secret = userData._id + process.env.SECRET_KEY;
      const token = jwt.sign({ userID: userData._id }, secret, {
        expiresIn: "20m",
      });
      const link = `http://127.0.0.1:3000/user/reset-password/${userData._id}/${token}`;
      let info = await transporter.sendMail({
        from: "parmarlaxmi260@gmail.com",
        to: userEmail,
        subject: "Email for user reset password",
        html: `<a href=${link}>click on this for reset password`,
      });
      return res.status(200).json({
        success: true,
        message: "Email sent succeessfully",
        token: token,
        userID: userData._id,
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Please enter valid email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  try {
    const checkUser = await userSchema.findById(id);
    if (checkUser != null) {
      const secretKey = checkUser._id + process.env.SECRET_KEY;
      jwt.verify(token, secretKey);
      if (newPassword === confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
        await userSchema.findByIdAndUpdate(checkUser._id, {
          $set: { userPassword: bcryptPassword },
        });
        res.status(201).json({
          success: true,
          message: "Password updated succcessfully",
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Password and confirmPassword does not match",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: `Please enter valid email`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur : ${error.message}`,
    });
  }
};

module.exports = {
  createUser,
  userLogIn,
  sendUserPasswordEmail,
  resetPassword,
};
