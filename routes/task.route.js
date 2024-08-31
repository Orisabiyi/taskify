const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  filterTaskByStatus,
} = require("../controller/task.controller.js");

router.get("/", getAllTasks);
router.post("/create", createTask);
router.post("/status", filterTaskByStatus);

module.exports = router;
