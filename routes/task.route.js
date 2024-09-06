const express = require("express");
const router = express.Router();
const {
  createUserTasks,
  getUserTasks,
  filterTaskByStatus,
  filterTaskByCategory,
  filterTaskByDate,
  filterTaskByPriority,
  updateUserTask,
  deleteUserTask,
} = require("../controller/task.controller.js");

router.get("/", getUserTasks);
router.post("/delete", deleteTask);
router.post("/update", updateUserTask);
router.post("/create", createUserTasks);

router.post("/filter/category", filterTaskByCategory);
router.post("/filter/priority", filterTaskByPriority);
router.post("/filter/status", filterTaskByStatus);
router.post("/filter/date", filterTaskByDate);

module.exports = router;
