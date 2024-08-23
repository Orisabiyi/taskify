const Task = require("../models/task.model.js");
const validator = require("validator");

const createTask = async function (req, res) {
  try {
    const { userId, name, status, categories, priority, dueDate } = req.body;

    // validate user inputs
    if (!userId || typeof userId !== Number)
      return res.status(401).json({ message: "invalid userId" });

    if (!name || typeof name !== String)
      return res.status(401).json({ message: "invalid name" });

    if (
      !status ||
      status.toLowerCase() !== "complete" ||
      status.toLowerCase() !== "uncomplete"
    )
      res.status(401).json({ message: "invalid status value" });

    if (!categories || typeof categories !== String)
      res.status(401).json({
        message: !categories
          ? "provide category value"
          : "categories value should be a string",
      });

    if (!priority || typeof priority !== Number)
      res.status(401).json({
        message: !priority
          ? "provide a value for priority"
          : "priority should be a number",
      });

    if (!validator.isDate(dueDate))
      res.status(401).json({ message: "date is invalid" });
  } catch (error) {
    res.status(500).json({ messae: error.message });
  }
};

module.exports = createTask;
