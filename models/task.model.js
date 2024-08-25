const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("task", TaskSchema);

module.exports = Task;
