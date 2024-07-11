const connection = require("../config/database");
const {
  getAll,
  getUserById,
  updateUserById,
  deletUserById,
} = require("../services/CRUDServieces");

const getHomePage = async (req, res) => {
  // res.render("example.ejs");
  let results = await getAllUser();
  return res.status(200).json({
    EC: 0,
    data: results,
  });
  // return res.render("homepage.ejs", { listUser: results });
};

const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  // let { email, name, city } = req.body;

  // connection.query(
  //   `Insert Into Users(email,name,city)
  //   Values(?, ?, ?)`,
  //   [email, name, city],
  //   function (err, results) {
  //     res.send("create user success");
  //   }
  // );

  let [results, fields] = await connection.query(
    `Insert Into Users(email,name,city)Values(?, ?, ?)`,
    [email, name, city]
  );
  res.send("create user success");
  console.log(results);
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
