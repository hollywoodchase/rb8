const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({
    name: { type: String },
    username: {
        type: String,
        unique: false,
        required: false
    },
    username_is_verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        unique: false,
        required: false
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

})

// Define schema methods
userSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password)
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10)
    }
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
    if (!this.password) {
        console.log('models/user.js =======NO PASSWORD PROVIDED=======')
        next()
    } else {
        console.log('models/user.js hashPassword in pre save');

        this.password = this.hashPassword(this.password)
        next()
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User