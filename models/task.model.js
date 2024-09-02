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
      enum: ["pending", "in-progress", "completed", "archived"],
    },
    categories: {
      type: String,
      required: true,
      enum: ["work", "personal", "urgent", "other"],
    },
    priority: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4],
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
