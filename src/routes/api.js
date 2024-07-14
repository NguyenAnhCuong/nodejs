const express = require("express");
const {
  getAllUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
  restoreUser,
  loginUser,
  registerUser,
  logoutUser,
} = require("../controllers/userController");
const authenticateJWT = require("../middleware/authenticateJWT");

const apiRouter = express.Router();

apiRouter.get("/users", getAllUser);
apiRouter.get("/user", getUserById);
apiRouter.post("/users", postUser);
apiRouter.put("/users", putUser);
apiRouter.delete("/users", deleteUser);
apiRouter.delete("/restore-users", restoreUser);
apiRouter.post("/login-user", loginUser);
apiRouter.post("/register-user", registerUser);
apiRouter.post("/log-out-user", authenticateJWT, logoutUser);

module.exports = apiRouter;
