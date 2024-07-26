const { QueryTypes, Op } = require("sequelize");
const { sequelize } = require("../config/database");
const Project = require("../models/Project");
const User = require("../models/User");

module.exports = {
  postProject: async (data) => {
    try {
      let today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months start at 0
      const dd = String(today.getDate()).padStart(2, "0");
      today = `${yyyy}-${mm}-${dd}`;
      if (!data.end_date) {
        return {
          success: false,
          errors: `Invalid end_date`,
        };
      }
      if (data.start_date && data.start_date < today) {
        return { success: false, errors: `Start_date must be after ${today}` };
      }

      let result = await Project.create({
        name: data.name,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        user_id: data.user_id,
      });

      return { success: true, data: result };
    } catch (error) {
      console.log(error);
      return { success: false, errors: error.message };
    }
  },
  getAll: async (userId) => {
    try {
      let result = await Project.findAll({
        where: {
          user_id: userId,
        },
      });
      return { success: true, data: result };
    } catch (error) {
      console.log(error);
      return { success: false, errors: error.message };
    }
  },
  putUpdateProject: async (data) => {
    try {
      if (!data.start_date) {
        return {
          success: false,
          errors: `Invalid start_date`,
        };
      }
      if (!data.end_date) {
        return {
          success: false,
          errors: `Invalid end_date`,
        };
      }
      if (data.end_date < data.start_date) {
        return { success: false, errors: "end_date must be after start_date" };
      }
      let result = await Project.update(
        {
          name: data.name,
          description: data.description,
          start_date: data.start_date,
          end_date: data.end_date,
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
};
