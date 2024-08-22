const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controller/user.controller.js");

router.post("/register", createUser);
router.get("/login", loginUser);

module.exports = router;
