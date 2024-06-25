const express = require("express");
const {} = require("../controllers/customerController");

const routerCustomer = express.Router();

routerCustomer.get("/users", getUserApi);
routerCustomer.post("/users", postUserApi);
routerCustomer.put("/users", putUserApi);
routerCustomer.delete("/users", deleteUserApi);

module.exports = routerCustomer;
