const express = require("express");
const crypto = require("crypto");
const razorpay = require("../utils/razorpay");
const router = express.Router();

// Route 1: Create Razorpay order
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_order_${Math.random().toString(36).substring(7)}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({ order_id: order.id });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    return res.status(500).json({ error: "Failed to create order" });
  }
};

// Route 2: Verify Razorpay payment signature
const verifyPayment = (req, res) => {
    // console.log("Verifying Razorpay payment signature...");
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", "zsa6u0QkWAaudIbR4lx59IKF")
      .update(sign.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Signature mismatch" });
    }
  } catch (err) {
    console.error("Error verifying Razorpay signature:", err);
    return res.status(500).json({ error: "Verification failed" });
  }
};

module.exports = { verifyPayment, createRazorpayOrder };
