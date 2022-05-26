const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    task: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    completed: {
        type: Boolean,
        default: false,
    },
})
exports.Todos = mongoose.model('Todos', todosSchema);