const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
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
        notEmpty: true, // Không được để trống
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Không được để trống
        isEmail: true, // Phải là email hợp lệ
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Không được để trống
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Không được để trống
      },
    },
  },
  {
    sequelize,
    tableName: "Users",
    paranoid: true,
    hooks: {
      beforeSave: async (user, options) => {
        if (user.role) {
          user.role = user.role.toUpperCase();
        }
        // if (user.password) {
        //   const salt = await bcrypt.genSalt(10);
        //   user.password = await bcrypt.hash(user.password, salt);
        // }
      },
    },
  }
);

// User.prototype.validatePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

module.exports = User;
