const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { createUser, getUserByPhone, getUserById } = require('../controllers/userController');


router.post('/register',createUser)
router.post('/getUserByPhone',getUserByPhone);
router.get('/:id',getUserById);
module.exports = router;