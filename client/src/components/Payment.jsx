import React, { useState } from "react";
import axios from "axios";

const Payment = () => {
  const [key, setKey] = useState("");

  // 🛒 Fetch Razorpay Key
  const getKey = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/payment/getKey");
      setKey(data.key);
    } catch (error) {
      console.error("Error fetching key:", error);
    }
  };

  // 🔄 Handle Razorpay Payment
  const handlePayment = async () => {
    try {
      // Step 1: Create order
      const { data } = await axios.post("http://localhost:5000/payment/create-order", {
        amount: 500, // ₹500
        currency: "INR",
        receipt: "receipt_1",
      });

      if (!data.success) {
        console.error("Order creation failed", data);
        return;
      }

      const order = data.order;

      // Step 2: Configure Razorpay options
      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: "My Shop",
        description: "Test Transaction",
        order_id: order.id,
        handler: function (response) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Step 3: Open Razorpay Payment Gateway
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in Razorpay Payment", error);
    }
  };

  return (
    <div>
      <button onClick={getKey}>Fetch Razorpay Key</button>
      <button onClick={handlePayment} disabled={!key}>
        Pay ₹500
      </button>
    </div>
  );
};

export default Payment;
    