import React, { useEffect, useRef, useState } from "react";
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
  const [razorPayInstance, setRazorPayInstance] = useState(null);
  const navigate = useNavigate();
  const hasInitiated = useRef(false);

  useEffect(() => {
    if (formData && !hasInitiated.current) {
      hasInitiated.current = true;
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
          console.log("Payment Verification Response:", verifyRes.data);
          if (verifyRes.data.success) {
            console.log(
              "Payment verified successfully: calling toast and create agent"
            );
            createAgent();
            // toast.success("Payment verified successfully");
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
          ondismiss: () => {
            console.log("Razorpay modal closed manually.");
            dispatch(hideLoader());
          },
        },
      };
      const razor = new window.Razorpay(options);
      setRazorPayInstance(razor);
      razor.open();
      // dispatch(hideLoader());
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("Payment failed to initiate");
    }
  };

  const createAgent = async () => {
    try {
      console.log("Creating agent with formData:", formData);
      const response = await axios.post(
        `${BACKEND_URL}/api/agent/register`,
        formData
      );
      const token = response?.data?.token;
      console.log("Token received:", token);
      Cookies.set("token", token, { expires: 1 });
      toast.success("Agent account created successfully");
      // razor.close();
      console.log("Closing Razorpay instance");
      dispatch(SignedIn());
      if (razorPayInstance) {
        razorPayInstance.close();
      }
      dispatch(hideLoader());
      setTimeout(() => {
        navigate("/agentDashboard");
      }, 500);
    } catch (error) {
      console.error("Error creating agent:", error);
    }
  };

  return (
    <div className="text-center bg-black text-white text-3xl font-bold h-[100vh] w-full flex items-center justify-center"></div>
  );
};

export default RazorPay;
