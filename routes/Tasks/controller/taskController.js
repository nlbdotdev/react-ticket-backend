const Task = require("../model/Task");

const createTask = async (req, res) => {
    try {
        console.log(req.body)
        
        // should do time handling in backend too
        const { title, desc, status, severity, time_created, time_updated } = req.body
        const collectionLength = await Task.countDocuments() + 1
   
        let newTask = new Task({
            uid: collectionLength,
            title: title,
            desc: desc,
            status: status,
            severity: severity,
            time_created: time_created,
            time_updated: time_updated,
        })

        let savedTask = await newTask.save()

        res.status(200).json({
            message: 'New task has been saved',
            payload: savedTask
        })

    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message })
    }
}

const getAllTasks = async (req, res) => {

    try {
        let allTasks = await Task.find()
        res.status(200).json(
            allTasks
        )
    } catch (error) {
        res.status(500).json({ message: "Error", error: error })
    }

}

module.exports = {
    createTask,
    getAllTasks
}