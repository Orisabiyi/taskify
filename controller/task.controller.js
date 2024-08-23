const validator = require("validator");
const { taskInputValidator } = require("../utils/validate.utils.js");
const Task = require("../models/task.model.js");

const createTask = async function (req, res) {
  try {
    const { userId, name, status, categories, priority, dueDate } = req.body;

    // if (taskInputValidator()) return
    taskInputValidator(
      res,
      userId,
      name,
      status,
      categories,
      priority,
      dueDate
    );

    const task = Task.create({
      userId,
      name,
      status,
      categories,
      priority,
      dueDate,
    });

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ messae: error.message });
  }
};

module.exports = createTask;
