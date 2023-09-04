const { body } = require("express-validator");

const validateRegistrationData = [
  body("email", "email is required").not().isEmpty(),
  body("email", "valid email is required").isEmail(),
  //   body("email", "email is invalid").not().isEmpty().isEmail(),
  body("password", "password is invalid").not().isEmpty().isLength({
    min: 3,
    max: 50,
  }),
  body("role", "role not selected"),
];

const validateLoginData = [
  body("email", "email is invalid").not().isEmpty().isEmail(),
  body("password", "password is required").not().isEmpty(),
];

const validateRefreshToken = [
  body("refresh", "refresh token is invalid").not().isEmpty().isLength({
    min: 1,
  }),
];

module.exports = {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
};
