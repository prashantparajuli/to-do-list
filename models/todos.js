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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})
exports.Todos = mongoose.model('Todos', todosSchema);