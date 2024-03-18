const express = require('express');
const router = express.Router();
const {addTask, getTask, updateTask, deleteTask} = require('../controllers/taskControllers');
const isAuth = require('../middlewares/auth');

router.post('/newTask', isAuth, addTask)
router.get('/getTask', isAuth, getTask)
router.route('/:id').put(isAuth, updateTask).delete(isAuth, deleteTask)

module.exports = router;