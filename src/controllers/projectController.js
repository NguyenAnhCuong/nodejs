const { postProject, getAll } = require("../services/projectServices");

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
};
