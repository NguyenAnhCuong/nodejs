const express = require("express");
const {
  getUserApi,
  postUserApi,
  putUserApi,
  deleteUserApi,
  postUploadSingleFile,
  postUploadMutipleFIle,
} = require("../controllers/apiController");

const routerApi = express.Router();

routerApi.get("/users", getUserApi);
routerApi.post("/users", postUserApi);
routerApi.put("/users", putUserApi);
routerApi.delete("/users", deleteUserApi);
routerApi.post("/file", postUploadSingleFile);
routerApi.post("/files", postUploadMutipleFIle);

module.exports = routerApi;
