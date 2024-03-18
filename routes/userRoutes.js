const express = require('express');
const router = express.Router();
const isAuthenticated = require("../middlewares/auth")

const {getAllUsers, register, login, getUserById, logout} = require('../controllers/userControllers')

router.get('/all', getAllUsers)

router.post('/new', register)

router.post('/login', login)

router.post('/logout', logout)

router.get('/userId',isAuthenticated,getUserById)

module.exports = router;