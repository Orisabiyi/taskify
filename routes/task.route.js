const express = require("express");
const router = express.Router();
const { createTask } = require("../controller/task.controller.js");

router.post("/create", createTask);

module.exports = router;
