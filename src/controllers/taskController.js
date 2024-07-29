const {
  postTask,
  getAll,
  deleteATask,
  putTask,
} = require("../services/taskServices");

module.exports = {
  getAllTask: async (req, res) => {
    let { id } = req.query;
    let result = await getAll(id);

    if (result.success) {
      return res.status(200).json({
        EC: 0,
        EM: "Get All Task Success",
        data: result.data,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        EM: "Get All Task Failed",
        error: result.errors,
      });
    }
  },
  createTask: async (req, res) => {
    let { project_id, name, description, status, deadline, parent_task_id } =
      req.body;

    let data = {
      project_id,
      name,
      description,
      status,
      deadline,
      parent_task_id: parent_task_id || null,
    };

    let result = await postTask(data);

    if (result.success) {
      return res.status(200).json({
        EC: 0,
        EM: "Create Task Success",
        data: result.data,
      });
    } else {
      return res.status(400).json({
        EC: -1,
        EM: "Create Task Failed",
        errors: result.errors,
      });
    }
  },
  updateTask: async (req, res) => {
    let {
      id,
      project_id,
      name,
      description,
      status,
      deadline,
      user_id,
      parent_task_id,
    } = req.body;

    let data = {
      id,
      project_id,
      name,
      description,
      status,
      deadline,
      user_id,
      parent_task_id: parent_task_id || null,
    };

    let result = await putTask(data);

    if (result.success) {
      return res.status(200).json({
        EC: 0,
        EM: "Update Task Success",
        data: result.data,
      });
    } else {
      return res.status(400).json({
        EC: -1,
        EM: "Update Task Failed",
        errors: result.errors,
      });
    }
  },
  deleteTask: async (req, res) => {
    let { id } = req.body;

    let result = await deleteATask(id);
    if (result.success) {
      return res.status(200).json({
        EC: 0,
        EM: "Delete Task Success",
        data: result.data,
      });
    } else {
      return res.status(500).json({
        EC: -1,
        EM: "Delete Task Failed",
        error: result.errors,
      });
    }
  },
};
