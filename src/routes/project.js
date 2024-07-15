const express = require("express");
const {
  getAllProject,
  createProject,
} = require("../controllers/projectController");

const projectRouter = express.Router();

projectRouter.get("/projects", getAllProject);
projectRouter.post("/projects", createProject);

module.exports = projectRouter;
