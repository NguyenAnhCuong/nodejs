const { QueryTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("../models/User");
const { name } = require("ejs");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const BlacklistedToken = require("../models/blacklistedToken");

const getAll = async (limit, page) => {
  try {
    if (limit && page) {
      let offset = (page - 1) * limit;
      options = {
        limit: parseInt(limit),
        offset: parseInt(offset),
      };
      const totalRecords = await User.count();
      let result = await User.findAll(options);
      return { success: true, data: result, totalRecords };
    } else {
      let result = await User.findAll({});
      return { success: true, data: result };
    }
  } catch (error) {
    console.log(error);
    return { success: false, errors: error.message };
  }
};

const getById = async (userId) => {
  try {
    let result = await User.findOne({ where: { id: userId } });
    console.log(result);
    return { success: true, data: result };
  } catch (error) {
    console.log(error);
    return { success: false, errors: error.message };
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
    return { success: true, data: result };
  } catch (error) {
    console.log(error);
    return { success: false, errors: error.message };
  }
};

const deleteUserById = async (userId) => {
  try {
    let result = await User.destroy({ where: { id: userId } });

    return { success: true, data: result };
  } catch (error) {
    console.log(error);
    return { success: false, errors: error.message };
  }
};

const postOneUser = async (data) => {
  const transaction = await sequelize.transaction();

  try {
    const existingUser = await User.findOne({
      where: { email: data.email },
      transaction: transaction,
    });

    if (existingUser) {
      await transaction.rollback();
      return { success: false, errors: "Email already exist" };
    }

    let result = await User.create(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image,
        role: data.role,
      },
      { transaction: transaction }
    );

    await transaction.commit();
    return { success: true, data: result };
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return { success: false, errors: error.message };
  }
};

const restoreDelete = async (id) => {
  try {
    let result = await User.restore({ where: { id: id } });
    return { success: true, data: result };
  } catch (error) {
    console.log(error);
    return { success: false, errors: error.message };
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
    const transaction = await sequelize.transaction();
    let result = await User.create(
      {
        email: data.email,
        name: data.name,
        password: data.password,
        image: "",
        role: "USER",
      },
      { transaction: transaction }
    );
    await transaction.commit();
    return { success: true, data: result };
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeUniqueConstraintError") {
      await transaction.rollback();
      // const validationErrors = error.errors.map((err) => err.message);
      return { success: false, errors: "Email is already exist" };
    } else {
      await transaction.rollback();
      return { success: false, errors: error.message };
    }
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
