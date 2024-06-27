const Customer = require("../models/customer");

module.exports = {
  updateCustomer: async () => {},
  getAll: async () => {
    try {
      let result = await Customer.find({});
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  createArrayCustomer: async (arr) => {
    try {
      let result = await Customer.insertMany(arr);

      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  createCustomer: async (data) => {
    try {
      let result = await Customer.create({
        name: data.name,
        phone: data.phone,
        address: data.address,
        description: data.description,
        email: data.email,
        image: data.image,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
