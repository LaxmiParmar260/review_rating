const jwt = require("jsonwebtoken");

const userAuthentication = async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  //   console.log(req.headers);
  console.log("authHeader :", authHeader);
  if (authHeader && authHeader.startsWith("Bearer")) {
    let token = authHeader.split(" ")[1]; //string to array
    //  console.log('token:', token);
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          success: false,
          message: "User is not authorize",
        });
      } else {
        req.user = decoded.userData;
        console.log(decoded.userData); //log in user Details, Decode the value
        next();
      }
    });
  } else {
    res.status(409).json({
      success: false,
      message: "Token not found",
    });
  }
};

module.exports = {
  userAuthentication,
};
