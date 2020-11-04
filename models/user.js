const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: { type: String, required: true },
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
    type: Number,
    required: true
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

// // Define schema methods
// UserSchema.methods = {
// 	checkPassword: function (inputPassword) {
// 		return bcrypt.compareSync(inputPassword, this.password)
// 	},
// 	hashPassword: plainTextPassword => {
// 		return bcrypt.hashSync(plainTextPassword, 10)
// 	}
// }

// // Define hooks for pre-saving
// UserSchema.pre('save', function (next) {
// 	if (!this.password) {
// 		console.log('models/Users.js =======NO PASSWORD PROVIDED=======')
// 		next()
// 	} else {
// 		console.log('models/Users.js hashPassword in pre save');

// 		this.password = this.hashPassword(this.password)
// 		next()
// 	}
// })

const User = mongoose.model("sign-up", userSchema);

module.exports = User;


// const Book = mongoose.model("Request", bookSchema);

// module.exports = Book;