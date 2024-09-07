const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  profile,
} = require("../controller/user.controller.js");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile", profile);

module.exports = router;
