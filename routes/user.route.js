const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  refreshToken,
  profile,
} = require("../controller/user.controller.js");

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.get("/profile", profile);

module.exports = router;
