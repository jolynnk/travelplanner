const express = require("express");
const router = express.Router();

const { register, login, refresh } = require("../controllers/auth");

const {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
} = require("../validators/auth");

router.put("/register", validateRegistrationData, register);
router.post("/login", validateLoginData, login);
router.post("/refresh", validateRefreshToken, refresh);

module.exports = router;
