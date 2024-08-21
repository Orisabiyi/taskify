const express = require("express");
const router = express.Router();
const { createUser } = require("../controller/user.controller.js");

router.post("/register", createUser);

module.exports = router;
