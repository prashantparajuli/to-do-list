const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    task: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
})
module.exports = mongoose.model('Todos', todosSchema);