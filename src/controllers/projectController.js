const {
  postProject,
  getAll,
  deleteAProject,
  putUpdateProject,
} = require("../services/projectServices");

module.exports = {
  getAllProject: async (req, res) => {
    let result = await getAll();

    if (result.success) {
      return res.status(200).json({
        EC: 0,
        EM: "Get All Project Success",
        data: result.data,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        EM: "Get All Project Failed",
        error: result.errors,
      });
    }
  },
  createProject: async (req, res) => {
    let { name, description, start_date, end_date } = req.body;

    let data = {
      name,
      description,
      start_date,
      end_date,
    };

    let result = await postProject(data);

    if (result.success) {
      return res.status(200).json({
        EC: 0,
        EM: "Create Project Success",
        data: result.data,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        EM: "Create Project Failed",
        error: result.errors,
      });
    }
  },
  updateProject: async (req, res) => {
    let { id, name, description, start_date, end_date } = req.body;

    let data = { id, name, description, start_date, end_date };

    let result = await putUpdateProject(data);
    if (result.success) {
      return res.status(200).json({
        EC: 0,
        EM: "Update Project Success",
        data: result.data,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        EM: "Update Project Failed",
        error: result.errors,
      });
    }
  },
  deleteProject: async (req, res) => {
    let { id } = req.body;

    let result = await deleteAProject(id);
    if (result.success) {
      return res.status(200).json({
        EC: 0,
        EM: "Delete Project Success",
        data: result.data,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        EM: "Delete Project Failed",
        error: result.errors,
      });
    }
  },
};
