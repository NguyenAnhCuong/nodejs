const { QueryTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("../models/User");
const { name } = require("ejs");

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
        phone: data.phone,
        email: data.email,
        password: data.password,
        image: data.image,
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

const deletUserById = async (userId) => {
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
      phone: data.phone,
      email: data.email,
      password: data.password,
      image: data.image,
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

module.exports = {
  restoreDelete,
  postOneUser,
  deletUserById,
  updateUserById,
  getAll,
  getById,
};
