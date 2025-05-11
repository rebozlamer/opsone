const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  marital_status: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  District: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobno: {
    type: Number,
    required: true,
    match: [/^\d{10}$/, "Mobile number must be 10 digits"],
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
  },
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
