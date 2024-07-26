const express = require("express");
const {
  getAllProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const authenticateToken = require("../middleware/authenticateToken");

const projectRouter = express.Router();

projectRouter.get("/projects", authenticateToken, getAllProject);
projectRouter.post("/projects", authenticateToken, createProject);
projectRouter.put("/projects", authenticateToken, updateProject);
projectRouter.delete("/projects", authenticateToken, deleteProject);

module.exports = projectRouter;
