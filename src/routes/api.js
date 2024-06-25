const express = require("express");
const {
  getUserApi,
  postUserApi,
  putUserApi,
  deleteUserApi,
} = require("../controllers/apiController");

const routerApi = express.Router();

routerApi.get("/users", getUserApi);
routerApi.post("/users", postUserApi);
routerApi.put("/users", putUserApi);
routerApi.delete("/users", deleteUserApi);

module.exports = routerApi;
