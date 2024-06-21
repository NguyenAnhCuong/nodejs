const mongoose = require("mongoose");

const kittySchema = new mongoose.Schema({
  name: String,
});
const Kitten = mongoose.model("mongodb-nodejs", kittySchema);

module.exports = Kitten;
