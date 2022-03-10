const { body } = require("express-validator");

exports.registerValidators = [
  body("reg_email").isEmail().withMessage("Email invalid"),

  body("reg_password", "Minimum password length 6 characters")
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric(),

  body("reg_password_confirm").custom((value, { req }) => {
    if (value !== req.body.reg_password) {
      throw new Error("Passwords do not match");
    }

    return true;
  }),

  body("reg_name")
    .isLength({ min: 3 })
    .withMessage("Minimum name length 3 characters"),
];
