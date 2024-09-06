const express = require("express");
const router = express.Router();
const {
  createUserTasks,
  getUserTasks,
  filterTaskByStatus,
  filterTaskByCategory,
  filterTaskByDate,
  filterTaskByPriority,
} = require("../controller/task.controller.js");

router.get("/", getUserTasks);
router.post("/create", createUserTasks);
router.post("/filter/category", filterTaskByCategory);
router.post("/filter/status", filterTaskByStatus);
router.post("/filter/date", filterTaskByDate);
router.post("/filter/priority", filterTaskByPriority);

module.exports = router;
