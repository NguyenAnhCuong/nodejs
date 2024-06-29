const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    phone: Number,
    address: String,
    description: String,
    image: String,
  },
  {
    timestamps: true, //createAt,updatedAt
    statics: {
      findByName(name) {
        return this.find({ name: new RegExp(name, "i") });
      },
    },
  }
);

customerSchema.plugin(mongoose_delete);
customerSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
