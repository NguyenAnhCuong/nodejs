const {
  createCustomer,
  createArrayCustomer,
  getAll,
} = require("../services/customerServices");
const { uploadSingleFile } = require("../services/fileService");
const Customer = require("../models/customer");

module.exports = {
  putUpdateCustomer: async (req, res) => {},
  getAllCustomer: async (req, res) => {
    let result = await getAll();
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
