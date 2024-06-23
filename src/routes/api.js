const express = require("express");
const { getUserApi } = require("../controllers/apiController");

const routerApi = express.Router();

routerApi.get("/", (req, res) => {
  res.status(200).json({
    data: "hello",
  });
});

routerApi.get("/users", getUserApi);

module.exports = routerApi;
