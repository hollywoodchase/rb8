const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: { type: String },
  username: {
    type: String,
    required: true,
    unique: true
  },
  username_is_verified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String
  },
  balance: {
    type: Number
  },
  withdraw: {
    type: Number
  },
  deposit: {
    type: Number
  },
  lastTrans: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
},
  { strict: false }
);


const User = mongoose.model("User", userSchema);

module.exports = User;

// {
//   "name": "Daniel Jones",
//   "username": "hollywoodchase",
//   "username_is_verified": true,
//   "password": "hollywood",
//   "balance": 5000,
//   "withdraw": "",
//   "deposit": "",
//   "lastTrans": ""
// }