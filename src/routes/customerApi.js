const express = require("express");
const {
  postCreateCustomer,
  postCreateCustomerArray,
  getAllCustomer,
  putUpdateCustomer,
} = require("../controllers/customerController");

const routerCustomer = express.Router();

routerCustomer.get("/customer", getAllCustomer);
routerCustomer.post("/customer", postCreateCustomer);
routerCustomer.post("/customers", postCreateCustomerArray);
routerCustomer.put("/customer", putUpdateCustomer);

module.exports = routerCustomer;
