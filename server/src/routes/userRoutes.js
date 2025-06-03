const express = require('express');
const router = express.Router();
const { createUser, getUserByPhone, getUserById, checkValidRuralFinId, addFavouriteToUserById, getFavouritesByUserId, checkUserPassword, getAllUsers, getAllUsersWithFinanceData } = require('../controllers/userController');

router.get('/', getAllUsers); 
router.get("/getAllUsersWithFinance",getAllUsersWithFinanceData)
router.post('/register',createUser)
router.post('/getUserByPhone',getUserByPhone);
router.post('/checkPassword',checkUserPassword);
router.post('/addToFavourites',addFavouriteToUserById);
router.get('/getFavourites/:id',getFavouritesByUserId);
router.get('/validate/:id',checkValidRuralFinId);
router.get('/:id',getUserById);
module.exports = router;