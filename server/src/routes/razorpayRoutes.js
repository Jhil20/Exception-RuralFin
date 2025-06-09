const express = require("express");
const {
  createRazorpayOrder,
  verifyPayment,
} = require("../controllers/razorpayController");
const router = express.Router();

// Route 1: Create Razorpay order
router.post("/create-order", createRazorpayOrder);

// Route 2: Verify Razorpay payment signature
router.post("/verify", verifyPayment);

module.exports = router;
