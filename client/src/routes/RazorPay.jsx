import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BACKEND_URL } from "../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignedIn } from "../redux/slices/isSignInSlice";
import { toast } from "react-toastify";
import { hideLoader, showLoader } from "../redux/slices/loadingSlice";

const RazorPay = () => {
  const location = useLocation();
  const formData = location?.state?.data || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (formData) {
      dispatch(showLoader());
      setTimeout(() => {
        initiatePayment();
      }, 2000);
    }
  }, [formData]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async () => {
    console.log("Initiating payment with formData:", formData);
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      console.log(
        "Creating order on backend with amount:",
        formData?.securityDeposit
      );
      const orderRes = await axios.post(
        `${BACKEND_URL}/api/razorpay/create-order`,
        {
          amount: formData?.securityDeposit,
        }
      );

      const { order_id } = orderRes.data;

      const options = {
        key: "rzp_test_rcMN4fKyf8uvKF",
        amount: formData?.securityDeposit,
        currency: "INR",
        name: "RuralFin",
        description: "Agent Registration Security Deposit Fee",
        order_id: order_id,
        theme: {
          color: "#000000",
        },
        handler: async (response) => {
          console.log("Payment Success:", response);

          const verifyRes = await axios.post(
            `${BACKEND_URL}/api/razorpay/verify`,
            response
          );
          if (verifyRes.data.success) {
            createAgent();
            toast.success("Payment verified successfully");
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: formData?.name || "",
          email: formData?.email || "",
          contact: formData?.phone || "",
        },
        modal: {
          escape: false,
          backdropclose: false,
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("Payment failed to initiate");
    }
  };

  const createAgent = async () => {
    toast.success("Creating agent account...");
    return;
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/agent/register`,
        formData
      );
      console.log("Response from server", response.data);
      const token = response?.data?.token;
      Cookies.set("token", token, { expires: 1 });
      toast.success("Agent account created successfully");
      dispatch(SignedIn());
      setTimeout(() => {
        navigate("/agentDashboard");
      }, 3000);
    } catch (error) {
      console.error("Error creating agent:", error);
    }
  };

  return (
    <div className="text-center text-3xl font-bold h-[90.7vh] w-full flex items-center justify-center">
      HHHHHHHHHHHHHHHHHHHHHHHHHH
    </div>
  );
};

export default RazorPay;
