const mongoose = require('mongoose');
const { Role } = require('../role');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 4,
    },
    role: {
        type: String,
        required: true,
        default: Role.basic,
        enum: ["basic", "admin"]
    },
})

exports.User = mongoose.model('User', userSchema);