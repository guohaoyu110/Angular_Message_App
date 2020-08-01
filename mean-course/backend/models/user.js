const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, require: true, unique: true}, // unique does not add as a validator
  password: { type: String, required: true}

});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
