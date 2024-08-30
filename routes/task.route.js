const express = require("express");
const router = express.Router();
const { createTask, getAllTasks } = require("../controller/task.controller.js");

router.get("/", getAllTasks);
router.post("/create", createTask);

module.exports = router;
