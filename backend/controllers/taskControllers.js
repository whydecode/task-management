const Task = require("../models/taskModel");
const asyncHandler = require("express-async-handler");

// @desc    Fetch all tasks
// @route   GET /api/tasks
// @access  Public
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
});

// @desc    Fetch single task
// @route   GET /api/tasks/:id
// @access  Public
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

// @desc    Create a task
// @route   POST /api/tasks
// @access  Public
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, dueDate, assignedUser } = req.body;
  const task = new Task({
    title,
    description,
    dueDate,
    status,
    assignedUser,
  });
  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Public
const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status, dueDate, assignedUser } = req.body;
  const task = await Task.findById(req.params.id);
  if (task) {
    task.title = title;
    task.description = description;
    task.status = status;
    task.dueDate = dueDate;
    task.assignedUser = assignedUser;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);

  if (task) {
    res.json({ message: "Task removed" });
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

// @desc    Fetch all tasks assigned to a user
// @route   GET /api/tasks/mytasks
// @access  Private
const getMyTasks = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const tasks = await Task.find({ assignedUser: req.user._id });
  res.json(tasks);
});

// @desc    Fetch all tasks assigned to a user
// @route   GET /api/tasks/mytasks
// @access  Private
const getUsersTasks = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tasks = await Task.find({ assignedUser: id });
  res.json(tasks);
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getMyTasks,
  getUsersTasks,
};
