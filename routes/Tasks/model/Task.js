const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    uid: Number,
    title: String,
    status: String,
    priority: String
})

module.exports = mongoose.model('task', taskSchema)