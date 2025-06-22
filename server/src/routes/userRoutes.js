const express = require('express');
const router = express.Router();
const { createUser, getUserByPhone, getUserById, checkValidRuralFinId, addFavouriteToUserById, getFavouritesByUserId, checkUserPassword, getAllUsers, getAllUsersWithFinanceData, getAllTransactionsAmountsByUserId, getAllAgentTransactionsAmountsByUserId, getUserByAadhar } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',authMiddleware, getAllUsers); 
router.get("/getAllUsersWithFinance",authMiddleware,getAllUsersWithFinanceData)
router.post('/register',createUser)
router.post('/getUserByPhone',getUserByPhone);
router.post('/getUserByAadhar',getUserByAadhar);
router.post('/checkPassword',checkUserPassword);
router.post('/addToFavourites',authMiddleware,addFavouriteToUserById);
router.get("/getTodayTransactionAmount/:id",authMiddleware,getAllTransactionsAmountsByUserId);
router.get("/getTodayAgentTransactionAmount/:id",authMiddleware,getAllAgentTransactionsAmountsByUserId);
router.get('/getFavourites/:id',authMiddleware,getFavouritesByUserId);
router.get('/validate/:id',authMiddleware,checkValidRuralFinId);
router.get('/:id',authMiddleware,getUserById);
module.exports = router;