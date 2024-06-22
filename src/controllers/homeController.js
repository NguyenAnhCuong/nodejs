const connection = require("../config/database");
const {
  getAllUser,
  getUserById,
  updateUserById,
  deletUserById,
} = require("../services/CRUDServieces");
const User = require("../models/user");

const getHomePage = async (req, res) => {
  // let results = await User.find({});
  let results = await getAllUser();
  return res.render("homepage.ejs", { listUser: results });
};

const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  await User.create({
    email,
    name,
    city,
  });

  res.redirect("/");
};

const getCreatePage = (req, res) => {
  return res.render("create.ejs");
};

const updateUser = async (req, res) => {
  const userId = req.params.id;

  let user = await getUserById(userId);

  return res.render("editpage.ejs", { user });
};

const postUpdateUser = async (req, res) => {
  let userId = req.body.userId;
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  await updateUserById(email, name, city, userId);

  res.redirect("/");
};

const postDeleteUser = async (req, res) => {
  const userId = req.params.id;

  let user = await getUserById(userId);

  res.render("deletepage.ejs", { user });
};

const DeleteUser = async (req, res) => {
  let userId = req.body.userId;
  await deletUserById(userId);
  res.redirect("/");
};

module.exports = {
  DeleteUser,
  postUpdateUser,
  updateUser,
  getCreatePage,
  getHomePage,
  postCreateUser,
  postDeleteUser,
};
