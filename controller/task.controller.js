const Task = require("../models/task.model.js");

const createTask = async function (req, res) {
  const { userId, name, status, categories, priority, dueDate } = req.body;
};

module.exports = createTask;
