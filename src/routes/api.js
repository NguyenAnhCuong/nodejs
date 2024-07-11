const express = require("express");
const {
  getAllUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
  restoreUser,
} = require("../controllers/userController");

const apiRouter = express.Router();

apiRouter.get("/users", getAllUser);
apiRouter.get("/user", getUserById);
apiRouter.post("/users", postUser);
apiRouter.put("/users", putUser);
apiRouter.delete("/users", deleteUser);
apiRouter.delete("/restore-users", restoreUser);

module.exports = apiRouter;
