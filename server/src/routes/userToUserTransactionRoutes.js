const express=require('express');
const { createUserToUserTransaction, updateStatus, deleteUserToUserTransaction } = require('../controllers/userToUserTransactionController');
const router=express.Router();

router.post("/",createUserToUserTransaction);
router.post("/updateStatus",updateStatus);
router.delete("/:id",deleteUserToUserTransaction);
module.exports = router;