const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { createUser } = require('../controllers/userController');

router.post('/register',createUser)

module.exports = router;