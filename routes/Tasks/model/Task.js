const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    uid: Number,
    title: String,
    desc: String,
    status: String,
    severity: String,
    time_created: Date,
    time_updated: Date,
})

module.exports = mongoose.model('task', taskSchema)