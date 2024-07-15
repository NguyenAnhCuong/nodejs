const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/database");

class Project extends Model {}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true,
      },
    },
  },
  {
    sequelize,
    tableName: "Projects",
    paranoid: true,
    hooks: {
      beforeSave: async (project, options) => {
        if (!project.start_date) {
          const today = new Date();
          const yyyy = today.getFullYear();
          const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months start at 0
          const dd = String(today.getDate()).padStart(2, "0");
          project.start_date = `${yyyy}-${mm}-${dd}`;
        }
        if (project.end_date < project.start_date) {
          throw new Error(`End_date must be after ${project.start_date}`);
        }
      },
    },
  }
);

module.exports = Project;
