const { QueryTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("../models/User");
const { name } = require("ejs");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const BlacklistedToken = require("../models/blacklistedToken");

const getAll = async () => {
  try {
    // let result = await City.findAll({});
    let result = await User.findAll({});
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getById = async (userId) => {
  try {
    let result = await User.findOne({ where: { id: userId } });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateUserById = async (userId, data) => {
  try {
    let result = await User.update(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image,
        role: data.role,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteUserById = async (userId) => {
  try {
    let result = await User.destroy({ where: { id: userId } });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const postOneUser = async (data) => {
  try {
    let result = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      image: data.image,
      role: data.role,
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const restoreDelete = async (id) => {
  try {
    let result = await User.restore({ where: { id: id } });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const postLoginUser = async (data) => {
  try {
    let result = await User.findAll({
      where: {
        [Op.and]: [{ email: data.email }, { password: data.password }],
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const postRegisterUser = async (data) => {
  try {
    let result = await User.create({
      email: data.email,
      name: data.name,
      password: data.password,
      image: "",
      role: "USER",
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const postLogOutUser = async (token) => {
  try {
    let result = await BlacklistedToken.create({ token });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  postLogOutUser,
  postRegisterUser,
  postLoginUser,
  restoreDelete,
  postOneUser,
  deleteUserById,
  updateUserById,
  getAll,
  getById,
};
