const { QueryTypes, Op } = require("sequelize");
const { sequelize } = require("../config/database");
const Task = require("../models/Task");

module.exports = {
  postTask: async (data) => {
    try {
      let result = await Task.create({
        project_id: data.project_id,
        name: data.name,
        description: data.description,
        status: data.status,
        deadline: data.deadline,
        user_id: data.user_id,
        parent_task_id: data.parent_task_id,
      });
      return { success: true, data: result };
    } catch (error) {
      console.log(error);
      return { success: false, errors: error.message };
    }
  },
  getAll: async () => {
    try {
      let result = await Task.findAll({});
      return { success: true, data: result };
    } catch (error) {
      console.log(error);
      return { success: false, errors: error.message };
    }
  },
  putTask: async (data) => {
    try {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const presentDay = `${yyyy}-${mm}-${dd}`;
      if (!data.deadline) {
        return {
          success: false,
          errors: `Invalid deadline`,
        };
      }
      if (data.deadline < presentDay) {
        return {
          success: false,
          errors: `deadline must be after ${presentDay}`,
        };
      }
      let result = await Task.update(
        {
          name: data.name,
          description: data.description,
          status: data.status,
          deadline: data.deadline,
          user_id: data.user_id,
        },
        {
          where: {
            id: data.id,
          },
        }
      );

      return { success: true, data: result };
    } catch (error) {
      console.log(error);
      return { success: false, errors: error.message };
    }
  },
  deleteAProject: async (id) => {
    try {
      let result = await Project.destroy({ where: { id } });
      return { success: true, data: result };
    } catch (error) {
      console.log(error);
      return { success: false, errors: error.message };
    }
  },
  deleteATask: async (id) => {
    try {
      let result = await Task.destroy({ where: { id } });
      return { success: true, data: result };
    } catch (error) {
      console.log(error);
      return { success: false, errors: error.message };
    }
  },
};
