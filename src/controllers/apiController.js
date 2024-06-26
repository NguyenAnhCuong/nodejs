const {
  getAllUser,
  getUserById,
  updateUserById,
  deletUserById,
} = require("../services/CRUDServieces");
const {
  uploadSingleFile,
  uploadMutilFile,
} = require("../services/fileService");
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

const postUploadSingleFile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let result = await uploadSingleFile(req.files.image);

  return res.status(200).json({
    EC: 0,
    result: result,
  });
};

const postUploadMutipleFIle = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  if (Array.isArray(req.files.image)) {
    let result = await uploadMutilFile(req.files.image);

    return res.status(200).json({
      EC: 0,
      result: result,
    });
  } else {
    return await postUploadSingleFile(req, res);
  }
};

module.exports = {
  postUploadMutipleFIle,
  postUploadSingleFile,
  deleteUserApi,
  getUserApi,
  postUserApi,
  putUserApi,
};
