const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  refreshToken,
} = require("../controller/user.controller.js");

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/login", refreshToken);

module.exports = router;
