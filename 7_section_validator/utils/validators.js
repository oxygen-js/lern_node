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
    }),

  body("reg_password", "Minimum password length 6 characters")
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric(),

  body("reg_password_confirm").custom((value, { req }) => {
    if (value !== req.body.reg_password) {
      throw new Error("Passwords do not match");
    }

    return true;
  }),

  body("name")
    .isLength({ min: 3 })
    .withMessage("Minimum name length 3 characters"),
];
