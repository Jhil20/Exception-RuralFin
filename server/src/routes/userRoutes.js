const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { createUser, getUserByPhone } = require('../controllers/userController');

router.post('/register',createUser)
router.post('/getUserByPhone',getUserByPhone);

module.exports = router;