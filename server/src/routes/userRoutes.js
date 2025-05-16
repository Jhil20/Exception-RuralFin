const express = require('express');
const router = express.Router();
const { createUser, getUserByPhone, getUserById, checkValidRuralFinId, addFavouriteToUserById } = require('../controllers/userController');


router.post('/register',createUser)
router.post('/getUserByPhone',getUserByPhone);
router.get('/:id',getUserById);
router.get('/validate/:id',checkValidRuralFinId);
router.post('/addToFavourites',addFavouriteToUserById);
module.exports = router;