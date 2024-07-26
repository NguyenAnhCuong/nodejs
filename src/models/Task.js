const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/database");
const Project = require("../models/Project");
const User = require("./User");

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    status: {
      type: DataTypes.ENUM("pending", "in_progress", "completed", "cancelled"),
      defaultValue: "pending",
    },
    deadline: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
    parent_task_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Task,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    tableName: "Tasks",
    paranoid: true,
    hooks: {
      beforeSave: async (task, options) => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const presentDay = `${yyyy}-${mm}-${dd}`;
        if (!task.deadline) {
          task.deadline = presentDay;
        }
        if (task.deadline < presentDay) {
          throw new Error(`deadline must be after ${presentDay}`);
        }
      },
    },
  }
);

Project.hasMany(Task, {
  foreignKey: "project_id",
});
Task.belongsTo(Project, {
  foreignKey: "project_id",
});

Task.hasMany(Task, {
  as: "subtasks",
  foreignKey: "parent_task_id",
});
Task.belongsTo(Task, {
  as: "parent",
  foreignKey: "parent_task_id",
});

module.exports = Task;
