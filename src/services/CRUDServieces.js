const connection = require("../config/database");

const getAllUser = async () => {
  let [results, fields] = await connection.query("select * from Users");
  return results;
};

const getUserById = async (userId) => {
  let [results, fields] = await connection.query(
    `Select * from Users where id = ?`,
    [userId]
  );
  let user = results && results.length > 0 ? results[0] : {};

  return user;
};

const updateUserById = async (email, name, city, userId) => {
  let [results, fields] = await connection.query(
    `Update Users Set email = ?,name = ?,city = ? where id = ?`,
    [email, name, city, userId]
  );
};

const deletUserById = async (userId) => {
  let [results, fields] = await connection.query(
    `Delete From Users where id = ?`,
    [userId]
  );
};

module.exports = { deletUserById, updateUserById, getAllUser, getUserById };
