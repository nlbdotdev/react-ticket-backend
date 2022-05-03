var express = require('express');
var router = express.Router();
const { createTask, getAllTasks, updateTask } = require('./controller/taskController') 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/get-all-tasks', getAllTasks)
router.post('/create-task', createTask)
router.put('/update-task/', updateTask)

module.exports = router;
