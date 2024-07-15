const { QueryTypes, Op } = require("sequelize");
const { sequelize } = require("../config/database");
const Project = require("../models/Project");

module.exports = {
  postProject: async (data) => {
    try {
      let result = await Project.create({
        name: data.name,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
      });

      return { success: true, data: result };
    } catch (error) {
      console.log(error);
      return { success: false, errors: [error.message] };
    }
  },
  getAll: async () => {
    try {
      let result = await Project.findAll({});
      return { success: true, data: result };
    } catch (error) {
      console.log(error);
      return { success: false, errors: [error.message] };
    }
  },
};
