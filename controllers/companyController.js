const { unlinkSync } = require("fs");
const companyReviewSchema = require("../models/companyReviewSchema");
const companySchema = require("../models/companySchema");

module.exports = {
  createCompany: async (req, res) => {
    try {
      const newCompany = new companySchema(req.body);
      newCompany.companyName = req.body.companyName
        .trim()
        .split(" ") // converting string to array
        .map((data) => {
          return data.charAt(0).toUpperCase() + data.slice(1);
        })
        .join(" "); // array to string
      console.log(newCompany.companyName);
      const checkCompany = await companySchema.findOne({
        companyName: req.body.companyName,
      });
      if (checkCompany != null) {
        //  for company exists or not
        req.file ? unlinkSync(req.file.path) : null;
        res.status(409).json({
          success: false,
          message: `This company already exists`,
        });
      } else {
        //import image
        const filePath = `/uploads/company/${req.file.filename}`;
        newCompany.companyPic = filePath;
        const company = await newCompany.save();
        res.status(201).json({
          success: true,
          message: "Company created",
          addedCompany: company,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occur : ${error.message}`,
      });
    }
  },

  companyDetail: async (req, res) => {
    companyID = req.params.id;
    userID = req.params.user;
    try {
      const companyData = await companySchema.findById(req.params.id);
      const reviewDataList = await companyReviewSchema
        .find({ companyID: req.params.id })
        .populate({ path: "userID", select: "userName pofilePic" });
      res.status(200).json({
        success: true,
        message: "Review list fetched successfully",
        company: companyData,
        reviewList: reviewDataList,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Review not found ${error.message}`,
      });
    }
  },

  companyList: async (req, res) => {
    try {
      const showAllcompanies = await companySchema
        .find
        // {},
        // { companyName: 1, _id: 0 }
        ();
      const totalCompanies = await companySchema.find().count();
      res.status(200).json({
        success: true,
        message: "All companies",
        count: totalCompanies,
        companyList: showAllcompanies,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occur : ${error.message}`,
      });
    }
  },

  searchCompany: async (req, res) => {
    const companyCity = req.body.companyCity;
    //console.log(";;;;", req.body.companyCity);
    try {
      const companies = await companySchema.find({
        companyCity: { $regex: `^${companyCity}`, $options: "i" },
      });
      console.log(companies);
      if (companies.length > 0) {
        res.status(200).json({
          success: true,
          message: "Searched companies",
          companies: companies,
        });
      } else {
        res.status(403).json({
          success: false,
          message: `No company found`,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occure ${error.message}`,
      });
    }
  },
};
