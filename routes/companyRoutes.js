let express = require("express");
const companyRouter = express.Router();

const { userAuthentication } = require("../middlewares/authentication");
const { authorizeAdmin } = require("../middlewares/authorization");
let companyController = require("../controllers/companyController");
const { companyUpload } = require("../middlewares/companyImageStorage");
const {createCompanyValidation} = require("../validations/company/companyDataVal");

//Post-method
companyRouter.post(
  "/create",
  companyUpload.single("companyPic"),
  userAuthentication,
  authorizeAdmin,
  createCompanyValidation,
  companyController.createCompany
);

//get-method
companyRouter.get("/list", companyController.companyList);
companyRouter.post("/city", companyController.searchCompany);
companyRouter.get("/details/:id", companyController.companyDetail);

module.exports = companyRouter;
