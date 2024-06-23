const {
  getAllUser,
  getUserById,
  updateUserById,
  deletUserById,
} = require("../services/CRUDServieces");
const User = require("../models/user");

const getUserApi = async (req, res) => {
  // let results = await User.find({});
  let results = await getAllUser();

  return res.status(200).json({
    EC: 0,
    data: results,
  });
};

module.exports = { getUserApi };
