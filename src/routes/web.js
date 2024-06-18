const express = require("express");
const {
  getHomePage,
  postCreateUser,
  getCreatePage,
  updateUser,
  postUpdateUser,
  postDeleteUser,
  DeleteUser,
} = require("../controllers/homeController");

const router = express.Router();

router.get("/", getHomePage);
router.get("/create", getCreatePage);
router.post("/createUser", postCreateUser);
router.get("/update/:id", updateUser);
router.post("/updateUser", postUpdateUser);
router.post("/deleteUser/:id", postDeleteUser);
router.post("/deleteUser", DeleteUser);

module.exports = router;
