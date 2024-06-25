const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: String,
    phone: Number,
    address: String,
    description: String,
    image: String,
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
