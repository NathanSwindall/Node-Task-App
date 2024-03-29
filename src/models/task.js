const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    timestamps: true // This is part of the options part in the mongoose database
})

const Task = mongoose.model('Task',taskSchema)


module.exports = Task