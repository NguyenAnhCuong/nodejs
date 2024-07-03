const Customer = require("../models/customer");

module.exports = {
  delArrayCustomer: async (arrId) => {
    try {
      let result = await Customer.delete({ _id: { $in: arrId } });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  delCustomer: async (customerId) => {
    try {
      let result = await Customer.deleteById(customerId);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  updateCustomer: async (customerId, dataCustomer) => {
    try {
      let result = await Customer.updateOne(
        { _id: customerId },
        {
          name: dataCustomer.name,
          phone: dataCustomer.phone,
          address: dataCustomer.address,
          description: dataCustomer.description,
          email: dataCustomer.email,
        }
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getAll: async (limit, page) => {
    try {
      let result = null;
      if (limit && page) {
        let offset = (page - 1) * limit;
        result = await Customer.find({}).skip(offset).limit(limit).exec();
      } else {
        result = await Customer.find({});
      }
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
