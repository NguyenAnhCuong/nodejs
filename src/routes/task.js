const express = require("express");
const {
  createTask,
  getAllTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const taskRouter = express.Router();

taskRouter.get("/tasks", getAllTask);
taskRouter.post("/tasks", createTask);
taskRouter.put("/tasks", updateTask);
taskRouter.delete("/tasks", deleteTask);

module.exports = taskRouter;
