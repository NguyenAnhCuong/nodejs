const express = require("express");
const {
  getAllProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const projectRouter = express.Router();

projectRouter.get("/projects", getAllProject);
projectRouter.post("/projects", createProject);
projectRouter.put("/projects", updateProject);
projectRouter.delete("/projects", deleteProject);

module.exports = projectRouter;
