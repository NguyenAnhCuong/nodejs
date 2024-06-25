const connection = require("../config/database");
const User = require("../models/user");

const getAllUser = async () => {
  let results = await User.find({});
  return results;
};

const getUserById = async (userId) => {
  let user = await User.findById(userId).exec();
  // let user = results && results.length > 0 ? results[0] : {};

  return user;
};

const updateUserById = async (email, name, city, userId) => {
  await User.updateOne({ _id: userId }, { email, name, city });
};

const deletUserById = async (userId) => {
  // await User.findByIdAndDelete(userId);
  let user = await User.deleteOne({ _id: userId });
  return user;
};

module.exports = { deletUserById, updateUserById, getAllUser, getUserById };
