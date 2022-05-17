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
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending'],
    },
})
module.exports = mongoose.model('Todos', todosSchema);