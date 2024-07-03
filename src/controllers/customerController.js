const {
  createCustomer,
  createArrayCustomer,
  updateCustomer,
  getAll,
  delCustomer,
  delArrayCustomer,
} = require("../services/customerServices");
const { uploadSingleFile } = require("../services/fileService");
const Customer = require("../models/customer");

module.exports = {
  deleteArrayCustomer: async (req, res) => {
    let result = await delArrayCustomer(req.body.customersId);

    if (result) {
      return res.status(200).json({
        EC: 0,
        EM: "Delete customers success",
        data: result,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        EM: "Cannt delete customers",
        data: result,
      });
    }
  },
  deleteCustomer: async (req, res) => {
    let { customerId } = req.body;

    let result = await delCustomer(customerId);
    if (result) {
      return res.status(200).json({
        EC: 0,
        EM: "Delete customers success",
        data: result,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        EM: "Cannt delete customer",
        data: result,
      });
    }
  },
  putUpdateCustomer: async (req, res) => {
    let { customerId, name, phone, address, description, email } = req.body;

    let customerData = {
      name,
      phone,
      address,
      description,
      email,
    };

    let result = await updateCustomer(customerId, customerData);

    if (result) {
      return res.status(200).json({
        EC: 0,
        EM: "Update customers success",
        data: result,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        EM: "Cannt update customer",
        data: result,
      });
    }
  },
  getAllCustomer: async (req, res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let result = null;
    if (limit && page) {
      result = await getAll(limit, page);
    } else {
      result = await getAll();
    }
    if (result) {
      return res.status(200).json({
        EC: 0,
        EM: "get all customers success",
        data: result,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        EM: "Cannt get customer",
        data: result,
      });
    }
  },
  postCreateCustomerArray: async (req, res) => {
    let customer = await createArrayCustomer(req.body.customers);
    if (customer) {
      return res.status(200).json({
        EC: 0,
        EM: "Create array customers success",
        data: customer,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        EM: "Cannt create customer",
        data: customer,
      });
    }
  },

  postCreateCustomer: async (req, res) => {
    let { name, phone, address, description, email } = req.body;
    let imageUrl = "";

    if (!req.files || Object.keys(req.files).length === 0) {
      return;
    } else {
      let result = await uploadSingleFile(req.files.image);
      imageUrl = result.path;
    }
    let customerData = {
      name,
      phone,
      address,
      description,
      email,
      image: imageUrl,
    };
    let customer = await createCustomer(customerData);

    return res.status(200).json({
      EC: 0,
      EM: "Create A Customer Success",
      data: customer,
    });
  },
};
