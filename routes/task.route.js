const express = require("express");
const router = express.Router();
const createTask = require("../routes/task.route.js");

router.post("/create", createTask);

module.exports = router;
