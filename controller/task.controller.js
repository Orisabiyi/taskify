const {
  taskInputValidator,
  isValidDate,
} = require("../utils/validate.utils.js");
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

    const findUserTask = await Task.find({ userId });
    if (!findUserTask || findUserTask.length === 0)
      return res
        .status(404)
        .json({ message: `There is no existing tasks for this user` });

    const filterUserTask = findUserTask.filter(
      (task) => task.category === category
    );

    if (!filterUserTask)
      return res
        .status(204)
        .json({ message: "There is no task with the category provided" });

    res.status(200).json({ taskByCategory: filterUserTask });
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
    const findUserTask = await Task.find({ userId });
    if (!findUserTask || findUserTask.length === 0)
      res.status(404).json({ message: "User do not exist" });

    // filter tasks based on status value and validate
    const filterUserTask = findUserTask.filter(
      (task) => task.status === status
    );
    if (!filterUserTask || filterUserTask.length === 0)
      return res
        .status(204)
        .json({ message: "There is no task with that status value" });

    // return the task based on the status provided when successful
    res.status(200).json({ taskByStatus: filterUserTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const filterTaskByDate = async function (req, res) {
  try {
    const { dueDate, userId } = req.body;

    if (!isValid(dueDate))
      return res.status(400).json({ message: "The date provided is invalid" });

    if (!userId || typeof userId !== "string")
      return res
        .status(400)
        .json({ message: "Provide a string value for userId" });

    const findUserTask = await Task.find({ userId });

    if (!findUserTask || findUserTask.length === 0)
      return res
        .status(400)
        .json({ message: "There is no existing user with the provided Id" });

    const filterUserTask = findUserTask.filter(
      (task) => task.dueDate === dueDate
    );

    if (!filterUserTask || filterUserTask.length === 0)
      return res
        .status(400)
        .json({ message: "No task with the provided Due Date" });

    res.status(200).json({ taskByDueDate: filterUserTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const filterTaskByPriority = async function (req, res) {
  try {
    const { priority, userId } = req.body;

    if (!priority || typeof priority !== "number")
      return res.status(400).json({
        message: "Provide a value for priority and it should be a number",
      });

    if (!userId || typeof userId !== "string")
      return res
        .status(400)
        .json({ message: "Provide a provide a string value for userId" });

    if (priority > 4 || priority < 1)
      return res
        .status(400)
        .json({ message: "The value of priority should be between 1 - 4" });

    const findUserTask = await Task.find({ userId });

    if (!findUserTask || findUserTask.length === 0)
      return res.status(400).json({ message: "No task exists for this user" });

    const filterUserTask = findUserTask.filter(
      (task) => task.priority === priority
    );

    if (!filterUserTask || filterUserTask.length === 0)
      return res
        .status(400)
        .json({ message: "There is no task for the provided priority" });

    res.status(200).json({ taskByPriority: filterUserTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  filterTaskByCategory,
  filterTaskByStatus,
  filterTaskByDate,
  filterTaskByPriority,
};
