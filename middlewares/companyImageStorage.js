const multer = require("multer");
//const { callbackPromise } = require("nodemailer/lib/shared");
const path = require("path");

const imageConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "..", "/uploads/company"));
  },
  filename: (req, file, callback) => {
    callback(null, `image_${Date.now()}.${file.originalname}`);
  },
});
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Only image is allowed"));
  }
};
const companyUpload = multer({
  storage: imageConfig,
  fileFilter: isImage,
});

module.exports = {
  companyUpload,
};
