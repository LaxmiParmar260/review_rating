const joi = require("joi");

const companyCreateValSchema = {
  createCompany: joi
    .object({
      companyName: joi
        .string()
        .min(3)
        .max(20)
        .message({
          "string.min": "{#lable} should contain at least {#limit} character",
        })
        .required(),
      companyCity: joi.string().required(),
      companyLocation: joi.string().required(),
    })
    .unknown(true),
};

module.exports = companyCreateValSchema;
