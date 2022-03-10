const { body } = require("express-validator");
const User = require("../models/user");

exports.registerValidators = [
  body("reg_email")
    .isEmail()
    .withMessage("Email invalid")
    .custom(async (value, req) => {
      try {
        const user = await User.findOne({ email: value });

        if (user) {
          return Promise.reject("User already exists");
        }
      } catch (error) {
        console.log(error);
      }
    })
    .normalizeEmail(),  

  body("reg_password", "Minimum password length 6 characters")
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),

  body("reg_password_confirm")
    .custom((value, { req }) => {
      if (value !== req.body.reg_password) {
        throw new Error("Passwords do not match");
      }

      return true;
    })
    .trim(),

  body("name")
    .isLength({ min: 3 })
    .withMessage("Minimum name length 3 characters")
    .trim(),
];

exports.courseValidators = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("Minimum name length 3 characters")
    .trim(),

  body("price").isNumeric().withMessage("Please enter a valid price"),

  body("logo").isURL().withMessage("Please enter a valid link"),
];
