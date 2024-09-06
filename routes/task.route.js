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
router.delete("/delete", deleteTask);
router.put("/update", updateUserTask);
router.post("/create", createUserTasks);

// This route are meant to filter or sort user task by category, priority, status or dueDate

router.post("/category", filterTaskByCategory);
router.post("/priority", filterTaskByPriority);
router.post("/status", filterTaskByStatus);
router.post("/date", filterTaskByDate);

module.exports = router;
