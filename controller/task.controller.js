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

    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTasks = async function (req, res) {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "Provide a userId" });

    const tasks = await Task.find({ userId });

    if (!tasks)
      return res
        .status(404)
        .json({ message: "Create a tasks, your task list is empty" });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterTaskByCategory = async function (req, res) {
  try {
    const { category, userId } = req.body;

    if (!category || !userId)
      return res
        .status(400)
        .json({ message: "Please provide both category and userId" });
    if (typeof category !== "string" || typeof userId !== "string")
      return res
        .status(400)
        .json({ message: "Both category and userId should be a string" });

    const tasks = await Task.find({ userId });
    if (!tasks || tasks.length === 0)
      return res
        .status(404)
        .json({ message: `There is no existing tasks for this user` });

    const taskCategory = tasks.filter((task) => task.category === category);

    if (!taskCategory)
      return res
        .status(204)
        .json({ message: "There is no task with the category provided" });

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterTaskByStatus = async function (req, res) {
  try {
    const { status, userId } = req.body;

    // validate user input
    if (!status || !userId)
      return res.status(400).json({
        message: "Please provide both status and userId.",
      });

    if (typeof status !== "string" || typeof userId !== "string")
      return res
        .status(400)
        .json({ message: "Both status and userId should be strings." });

    // find tasks related to userId and validate the existence
    const tasks = await Task.find({ userId });
    if (!tasks || tasks.length === 0)
      res.status(404).json({ message: "User do not exist" });

    // filter tasks based on status value and validate
    const taskStatus = tasks.filter((task) => task.status === status);
    if (!taskStatus || taskStatus.length === 0)
      return res
        .status(204)
        .json({ message: "There is no task with that status value" });

    // return the task based on the status provided when successful
    res.status(200).json({ message: taskStatus });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const filterTaskByPriority = async function (req, res) {
  try {
    const { dueDate, userId } = req.body;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  filterTaskByCategory,
  filterTaskByStatus,
  filterTaskByPriority,
};
