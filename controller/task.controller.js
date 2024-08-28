const validator = require("validator");
const { taskInputValidator } = require("../utils/validate.utils.js");
const Task = require("../models/task.model.js");

const createTask = async function (req, res) {
  try {
    const { userId, name, status, categories, priority, dueDate } = req.body;

    if (
      taskInputValidator(
        res,
        userId,
        name,
        status,
        categories,
        priority,
        dueDate
      ) !== true
    )
      return;

    const task = await Task.create({
      userId,
      name,
      status,
      categories,
      priority,
      dueDate,
    });

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTasks = async function (req, res) {
  try {
    const { userId } = req.body;
    const tasks = await Task.findById(userId);

    if (!tasks)
      return res
        .status(401)
        .json({ message: "Create a tasks, your task list is empty" });

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getAllTasks };
