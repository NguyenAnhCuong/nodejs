const {
  getAllUser,
  getUserById,
  updateUserById,
  deletUserById,
} = require("../services/CRUDServieces");
const User = require("../models/user");

const getUserApi = async (req, res) => {
  let user = await getAllUser();

  return res.status(200).json({
    EC: 0,
    data: user,
  });
};

const postUserApi = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  let results = await User.create({
    email,
    name,
    city,
  });

  return res.status(201).json({
    EC: 0,
    data: results,
  });
};

const putUserApi = async (req, res) => {
  let userId = req.body.userId;
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  let user = await updateUserById(email, name, city, userId);

  return res.status(200).json({
    EC: 0,
    data: user,
  });
};

const deleteUserApi = async (req, res) => {
  let userId = req.body.userId;
  let user = await deletUserById(userId);

  return res.status(200).json({
    EC: 0,
    data: user,
  });
};

module.exports = { deleteUserApi, getUserApi, postUserApi, putUserApi };
