const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minlength: 4,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
})

exports.User = mongoose.model('User', userSchema);