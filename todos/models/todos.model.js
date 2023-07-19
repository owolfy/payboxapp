const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        required: true,
        type: String
    },
    deadline: {
        required: true,
        type: Date
    },
    isCompleted: {
        required: true,
        type: Boolean
    },
    email: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: Date
    }
})

module.exports = mongoose.model('Todos', todoSchema);