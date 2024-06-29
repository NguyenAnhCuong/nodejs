const express = require("express");
const {
  postCreateCustomer,
  postCreateCustomerArray,
  getAllCustomer,
  putUpdateCustomer,
  deleteCustomer,
  deleteArrayCustomer,
} = require("../controllers/customerController");

const routerCustomer = express.Router();

routerCustomer.get("/customer", getAllCustomer);
routerCustomer.post("/customer", postCreateCustomer);
routerCustomer.post("/customers", postCreateCustomerArray);
routerCustomer.put("/customer", putUpdateCustomer);
routerCustomer.delete("/customer", deleteCustomer);
routerCustomer.delete("/customers", deleteArrayCustomer);

module.exports = routerCustomer;
