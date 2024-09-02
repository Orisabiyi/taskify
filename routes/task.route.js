const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  filterTaskByStatus,
  filterTaskByCategory,
  filterTaskByDate,
  filterTaskByPriority,
} = require("../controller/task.controller.js");

router.get("/", getAllTasks);
router.post("/create", createTask);
router.post("/filter/category", filterTaskByCategory);
router.post("/filter/status", filterTaskByStatus);
router.post("/filter/date", filterTaskByDate);
router.post("/filter/priority", filterTaskByPriority);

module.exports = router;
