const bcrypt = require("bcrypt")
let userSchema = require("../models/userSchema");
// user login
let createUser = async (req, res) => {
  const userData = new userSchema(req.body);
  try {
    const isUserExists = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExists) {
      res.status(409).json({
        success: false,
        message: "User is already registered with this email",
      });
    } else {
      //for encryption of password
      const salt = await bcrypt.genSalt(10);
      userData.userPassword = await bcrypt.hash(req.body.userPassword, salt);
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
const userLogIn = async(req, res) =>{
  try{
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if(userData){
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        userData.userPassword
      );
      if(userData && hashPassword){
        res.status(200).json({
          success: true,
          message: " User logged in Successfully"
        })
      }else{
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        })
      }
    }else{
      res.status(403).json({
        success: false,
        message: "User is not reconized with this email"
      })
    }
  }
  catch(error){
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    })
  }
}
module.exports = {
  createUser,
  userLogIn
};
