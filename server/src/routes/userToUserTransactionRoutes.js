const express=require('express');
const { createUserToUserTransaction } = require('../controllers/userToUserTransactionController');
const router=express.Router();

router.post("/",createUserToUserTransaction);

module.exports = router;