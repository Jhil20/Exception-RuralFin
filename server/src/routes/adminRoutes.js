const express = require('express');
const { getAdminOverviewCardData, createAdmin, getAdminByPhone, checkAdminPassword, getRecentActivityData, getTransactionVolumeData, getAllUserRelatedTransactions } = require('../controllers/adminController');
const router = express.Router();


router.get("/OverviewCardData",getAdminOverviewCardData);
router.get("/allTransactionsForUser/:id",getAllUserRelatedTransactions)
router.get("/transactionVolume",getTransactionVolumeData);
router.get("/recentActivity",getRecentActivityData)
router.post("/getAdminByPhone",getAdminByPhone)
router.post("/insertAdmin",createAdmin);
router.post("/checkPassword",checkAdminPassword)
module.exports = router;