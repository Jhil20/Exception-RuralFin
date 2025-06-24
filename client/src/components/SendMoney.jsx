import { useEffect, useRef, useState } from "react";
import {
  Search,
  Send,
  Users,
  ArrowRight,
  X,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { BACKEND_URL } from "../utils/constants";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SendMoneySchema } from "../yupValidators/validationSchema";
import axios from "axios";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";
import capitalize from "../utils/capitalize";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getSocket } from "../utils/socket";
import Cookies from "js-cookie";

export const SendMoney = ({ showSend, user, finance, toastControl }) => {
  const [step, setStep] = useState("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectPlaceholder, setSelectPlaceholder] = useState("Please select a remark");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [placeholder, setPlaceholder] = useState("Search Favourites by name or RuralFin ID");
  const [otp, setOtp] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [filteredFavourites, setFilteredFavourites] = useState([]);
  const [receiverUser, setReceiverUser] = useState(null);
  const [ruralfinValue, setRuralFinValue] = useState("");
  const [otpAmount, setOtpAmount] = useState("");
  // const [ruralfinValue, setFavRuralFinId] = useState("");
  const [ruralFinId, setRuralFinId] = useState("");
  const [isValidId, setIsValidId] = useState(null);
  const [disableFav, setDisableFav] = useState(true);
  const [addFavourites, setAddFavourites] = useState(false);
  const [transactionCreated, setTransactionCreated] = useState(null);
  const [resetCaptcha, setResetCaptcha] = useState(false);
  const [settings, setSettings] = useState({});
  const formikRef = useRef();
  const setShowSend = showSend.setShowSend;
  const setTransactionSuccess = toastControl.setTransactionSuccess;
  const setOtpVerified = toastControl.setOtpVerified;
  const showSendVar = showSend.showSend;
  const token = Cookies.get("token");
  const getSettings = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/admin/getSystemSettings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Settings response:", response);
      setSettings(response.data.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    if (showSendVar) {
      if (window.recaptchaVerifier) {
        // Reset the reCAPTCHA if it already exists
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // console.log("reCAPTCHA solved:", response);
          },
          "expired-callback": () => {
            console.warn("reCAPTCHA expired. Please try again.");
          },
        }
      );

      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
    }
  }, [showSendVar, resetCaptcha]);

  const debouncedCheckRuralFinId = debounce(async (id) => {
    if (id.endsWith("@RURALFIN")) {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/user/validate/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const found = response?.data?.found;
        setIsValidId(found);
        setDisableFav(!found);
      } catch (error) {
        console.error("Error checking ID:", error);
        setIsValidId(false);
        setDisableFav(true);
      }
    } else {
      setIsValidId(null);
      setDisableFav(true);
    }
  }, 500);

  const handleRuralFinIdChange = (e, setFieldValue) => {
    const value = e.target.value.toUpperCase();
    setRuralFinValue(value);
    setFieldValue("ruralFinId", value);
    setIsValidId(null); // reset immediately on change
    setDisableFav(true); // disable button until validated
    debouncedCheckRuralFinId(value); // debounce validation
  };

  const sendMoneyInitialValues = {
    ruralfinId: "",
    amount: "",
    password: "",
    remarks: "",
  };
  const addFavouritesInitialValues = { ruralFinId: "" };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleSendMoneySubmit = async (values) => {
    const { ruralfinId, amount, password, remarks } = values;
    if (finance?.balance < amount) {
      toast.error("Insufficient balance");
      return;
    }
    if(values.ruralfinId === user?.ruralFinId) {
      toast.error("You cannot send money to yourself");
      return;
    }
    setIsSubmitting(true);
    try {
      const response2 = await axios.get(
        `${BACKEND_URL}/api/user/getTodayTransactionAmount/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const transactionsAmount = response2?.data?.data?.today;
      // console.log("transactionsAmount", transactionsAmount);
      if (transactionsAmount + amount > settings?.maxDailyLimit) {
        toast.error(
          `You can only transfer upto ₹${settings?.maxDailyLimit} per day`
        );
        setIsSubmitting(false);
        return;
      } else if (amount < settings?.minTransactionAmount) {
        toast.error(
          `Minimum transaction amount is ₹${settings?.minTransactionAmount}`
        );
        setIsSubmitting(false);
        return;
      } else if (amount > settings?.maxTransactionAmount) {
        toast.error(
          `Maximum transaction amount is ₹${settings?.maxTransactionAmount}`
        );
        setIsSubmitting(false);
        return;
      } else if (
        amount + response2?.data?.data?.thisWeek >
        settings?.maxWeeklyLimit
      ) {
        toast.error(
          `You can only transfer upto ₹${settings?.maxWeeklyLimit} per week`
        );
        setIsSubmitting(false);
        return;
      }
      const response = await axios.post(
        `${BACKEND_URL}/api/userToUserTransaction/`,
        {
          senderId: user._id,
          receiverRuralId: ruralfinId,
          amount,
          remarks,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response", response);
      setTransactionCreated(response?.data?.transaction);
      setReceiverUser(response?.data?.receiver);
      setOtpAmount(amount);

      //sending otp
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        toast.error("reCAPTCHA not initialized. Please refresh the page.");
        setIsSubmitting(false);
        return;
      }

      // console.log("btn clicked");

      const fullPhone = `+91${user.phone}`;
      // const fullPhone="+919998076910"
      // console.log("Full Phone Number:", fullPhone);
      // setPhoneState(fullPhone);
      // try {
      //   const response = await axios.post(
      //     `${BACKEND_URL}/api/user/getUserByPhone`,
      //     values
      //   );
      //   // console.log("Response from server:", response);

      //   if (!response?.data?.success) {
      //     toast.error("User not found with given phone number & role");
      //     setSubmitting(false);
      //   } else {
      // console.log("in else");
      // const token = response?.data?.token;
      // Cookies.set("token", token, { expires: 1 });
      // const decodedToken = jwt(token);
      // appVerifier.verify().then(async ()=>{
      // console.log("reCAPTCHA verified");

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhone,
        appVerifier
      );

      // console.log("Confirmation Result:", confirmationResult);

      // console.log("SMS sent successfully:", confirmationResult);
      window.confirmationResult = confirmationResult;
      setStep("otp");
    } catch (err) {
      if (err?.response?.data?.message == "Transaction PIN is incorrect") {
        toast.error("Transaction PIN is incorrect");
        return;
      }
      // console.log("checking delete", transactionCreated._id);
      if (transactionCreated?._id) {
        const response = await axios.delete(
          `${BACKEND_URL}/api/userToUserTransaction/${transactionCreated?._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("response of transactiopn update", response);
      }
      if (err?.response?.data?.message == "Receiver not found") {
        toast.error("Receiver not found. Please check the RuralFin ID.");
        return;
      }
      console.log("Error in transaction", err);
      toast.error("Transaction failed. please refresh & try again.");
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!window.confirmationResult) {
      toast.error("OTP session expired.");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      setIsSubmitting(false);
      return;
    }

    try {
      const otpNumber = e.target.otp.value;

      const confirmationResult = window.confirmationResult;

      // Verify OTP
      const result = await confirmationResult.confirm(otpNumber);
      const userVerified = result.user;

      // console.log("User verified successfully:", userVerified);

      // toast.success("OTP verified successfully!");
      setOtpVerified(true);
      // const response = await axios.post(
      //   `${BACKEND_URL}/api/userToUserTransaction/updateStatus`,
      //   {
      //     transactionId: transactionCreated?._id,
      //     status: "completed",
      //   }
      // );

      // console.log(
      //   "before sending data to backend",
      //   user._id,
      //   transactionCreated?.receiverId,
      //   transactionCreated?.amount,
      //   transactionCreated?._id
      // );

      const response = await axios.post(
        `${BACKEND_URL}/api/finance/transfer`,
        {
          senderId: user._id,
          receiverId: transactionCreated?.receiverId,
          amount: transactionCreated?.amount,
          transactionId: transactionCreated?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response of transaction complete", response);
      if (finance?.isBudgetPlanningEnabled) {
        const response2 = await axios.put(
          `${BACKEND_URL}/api/budget/updateBudgetSpending`,
          {
            userId: user._id,
            amount: transactionCreated?.amount,
            category: transactionCreated?.remarks,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("response of budget update", response2);
      }
      const socket = getSocket(user._id);
      socket.emit("money-sent-by-sender", {
        transaction: transactionCreated,
      });
      setTransactionSuccess(true);
      setStep("form");
      setSelectedUser(null);
      setAmount("");
      setPassword("");
      setOtp("");
      setRuralFinValue("");
      setRuralFinId("");
      setTransactionCreated(null);
      setIsValidId(null);
      setShowSend(false);
    } catch (error) {
      console.error("Error verifying OTP:", error);

      toast.error("Error occured. Transaction failed");

      const response = await axios.delete(
        `${BACKEND_URL}/api/userToUserTransaction/${transactionCreated?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response of transactiopn update", response);
      setStep("form");
      setSelectedUser(null);
      setAmount("");
      setPassword("");
      setOtp("");
      setRuralFinValue("");
      setRuralFinId("");
      setTransactionCreated(null);
      setIsValidId(null);
    } finally {
      setIsSubmitting(false);
    }

    // console.log("Transfer completed");
    // setStep("form");
    // setSelectedUser(null);
    // setAmount("");
    // setPassword("");
    // setOtp("");
    // setRuralFinValue("");
  };

  const getFavourites = async () => {
    // console.log("get fav called");
    const fav = user?.favourites || [];
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/user/getFavourites/${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response of get favourites", response?.data?.favourites);
      setFavourites(response?.data?.favourites);
      setFilteredFavourites(response?.data?.favourites);
    } catch (err) {
      console.log("error in getting favourites", err);
      toast.error("Error fetching favourites. Please Refresh & Try Again.");
      return;
    }
  };

  const handleAddFavourite = async () => {
    if (!ruralfinValue) return;
    if (user?.ruralFinId === ruralfinValue) {
      toast.error("You cannot add yourself to favourites");
      setRuralFinValue("");
      setIsValidId(null);
      setDisableFav(true);
      return;
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/addToFavourites`,
        { userId: user._id, ruralFinId: ruralfinValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response of add fav", response);
      if (response?.data?.success) {
        getFavourites();
        toast.success("User added to favourites");
        setAddFavourites(false);
        setRuralFinValue("");
        setIsValidId(null);
        setDisableFav(true);
        getFavourites();
      }
      // console.log("Adding to favourites:", ruralfinValue);
      // setAddFavourites(false);
      // setRuralFinValue("");
      // setIsValidId(null);
      // setDisableFav(true);
    } catch (error) {
      if (error?.response?.data?.message == "User already in favourites") {
        toast.error("User already in favourites");
        // setAddFavourites(false);
        setRuralFinValue("");
        setIsValidId(null);
        setDisableFav(true);
      }
      console.error("Error adding favourite:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 740) {
        setPlaceholder("Search Favourites");
        setSelectPlaceholder("Select Remark")
      } else {
        setPlaceholder("Search Favourites by name or RuralFin ID");
        setSelectPlaceholder("Please select a remark");
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBackForm = async () => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/userToUserTransaction/${transactionCreated?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response of transactiopn update", response);
      setStep("form");
      setSelectedUser(null);
      setAmount("");
      setPassword("");
      setOtp("");
      setRuralFinValue("");
      setRuralFinId("");
      setTransactionCreated(null);
      setResetCaptcha(!resetCaptcha);
      setIsValidId(null);
      setShowSend(false);
    } catch (err) {
      console.log("error in back", err);
    }
  };

  useEffect(() => {
    // console.log("get fav called in usseEffect");
    getFavourites();
    getSettings();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="recaptcha-wrapper mb-4">
        <div id="recaptcha-container"></div>
      </div>
      {step == "otp" ? (
        <div className="bg-white w-11/12 lg:w-1/3 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Verify Transfer
            </h2>
            <button
              onClick={() => handleBackForm()}
              className=" cursor-pointer text-md transition-all duration-300 text-gray-500 hover:text-gray-900"
            >
              <X className="text-gray-800 p-1 h-9 w-9 transition-all duration-500 hover:bg-gray-200 rounded-lg cursor-pointer" />
            </button>
          </div>
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                Sending to :
                {receiverUser
                  ?" "+ capitalize(receiverUser?.firstName) +
                    " " +
                    capitalize(receiverUser?.lastName) +
                    " ( " +
                    receiverUser?.ruralFinId +
                    " )"
                  : "Unknown"}
              </p>
              <p className="text-lg font-semibold">${otpAmount}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP sent to your phone
              </label>
              <input
                name="otp"
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-black focus:border-transparent"
                placeholder="Enter 6-digit OTP"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer disabled:cursor-not-allowed bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <span>Transfering Funds...</span>
              ) : (
                <span>Confirm Transfer</span>
              )}
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white h-fit w-11/12 lg:w-9/12 rounded-xl shadow-lg p-6 relative">
          <div className="flex items-center justify-between mb-6">
            <X
              onClick={() => {
                if (window.recaptchaVerifier) {
                  // Reset the reCAPTCHA if it already exists
                  window.recaptchaVerifier.clear();
                  window.recaptchaVerifier = null;
                }
                setShowSend(false);
              }}
              className="text-gray-800 p-1 h-8 w-8 md:h-9 md:w-9 transition-all duration-500 hover:bg-gray-200 rounded-lg cursor-pointer"
            />
            <h2 className="text-xl font-semibold text-gray-900">Send Money</h2>
            <div className="relative">
              {addFavourites ? (
                <X
                  onClick={() => setAddFavourites(false)}
                  className="text-gray-800 p-1 h-8 w-8 md:h-9 md:w-9 bg-gray-200  transition-all duration-500 hover:bg-gray-200 rounded-lg cursor-pointer"
                />
              ) : (
                <Users
                  onClick={() => setAddFavourites(true)}
                  className="md:h-10 h-9 w-9 md:w-10 text-gray-800 cursor-pointer hover:bg-gray-200 transition-all duration-500 p-2 rounded-lg"
                />
              )}
              {addFavourites && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg p-4 pt-3 border border-gray-200 animate-fadeIn z-50">
                  <div className="flex h-9 mb-2 justify-center items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Add Favourites
                    </h3>
                  </div>
                  <Formik
                    initialValues={addFavouritesInitialValues}
                    // validationSchema={AddFavouritesValidationSchema}
                    onSubmit={handleAddFavourite}
                  >
                    {({ setFieldValue, handleBlur, touched, errors }) => (
                      <Form>
                        <div className="relative">
                          <Field
                            type="text"
                            name="ruralFinId"
                            value={ruralfinValue}
                            onChange={(e) =>
                              handleRuralFinIdChange(e, setFieldValue)
                            }
                            onBlur={handleBlur}
                            placeholder="Enter RuralFin ID"
                            className={`w-full px-3 py-2 pr-8 border rounded-lg text-sm mb-1 ${
                              touched.ruralFinId && errors.ruralFinId
                                ? "border-red-500"
                                : "border-gray-300"
                            } focus:ring-2 focus:ring-black focus:border-transparent focus:outline-none`}
                          />
                          {isValidId === true && (
                            <CheckCircle className="absolute right-3 top-2.5 h-5 w-5 text-green-500" />
                          )}
                          {isValidId === false && (
                            <XCircle className="absolute right-3 top-2.5 h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <ErrorMessage
                          name="ruralFinId"
                          component="div"
                          className="text-red-500 text-xs mb-3"
                        />
                        <button
                          type="submit"
                          disabled={disableFav}
                          className={`w-full bg-black ${
                            disableFav ? "cursor-not-allowed" : "cursor-pointer"
                          } disabled:bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm mt-2`}
                        >
                          Add to Favourites
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </div>
          </div>

          {/* Search & Favourites Section */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                disabled={favourites.length === 0}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  const filtered = favourites.filter((user) => {
                    const fullName =
                      `${user?.firstName} ${user?.lastName}`.toLowerCase();
                    const ruralFinId = user?.ruralFinId.toLowerCase();
                    const query = e.target.value.toLowerCase();
                    return (
                      fullName.includes(query) || ruralFinId.includes(query)
                    );
                  });
                  setFilteredFavourites(filtered);
                }}
                placeholder={placeholder}
                className={`w-full pl-10 pr-4 py-2 border hover:border-gray-700 transition-all duration-300 ${
                  favourites.length === 0 ? "cursor-not-allowed" : "cursor-text"
                } border-gray-200 rounded-lg focus:ring-black focus:border-transparent`}
              />
            </div>
            <div className="max-h-52 min-h-36 mb-5 overflow-y-auto space-y-2">
              {favourites.length === 0 ? (
                <div className="w-full h-36 flex items-center justify-center">
                  <h1 className="text-xl font-semibold text-gray-500">
                    No Favourites Added
                  </h1>
                </div>
              ) : filteredFavourites.length == 0 ? (
                <div className="w-full h-36 flex items-center justify-center">
                  <h1 className="text-xl font-semibold text-gray-500">
                    No Favourites Found
                  </h1>
                </div>
              ) : (
                filteredFavourites.map((user) => (
                  <div
                    key={user?._id}
                    onClick={() => {
                      handleUserSelect(user);
                      setRuralFinId(user?.ruralFinId);
                      formikRef.current?.setFieldValue(
                        "ruralfinId",
                        user?.ruralFinId
                      );
                    }}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedUser?.id === user?.id
                        ? "bg-gray-100"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {/* {console.log("user selected", selectedUser, user?.id)} */}
                    <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {user?.firstName[0].toUpperCase() +
                          user?.lastName[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium md:text-base text-sm text-gray-900">
                        {capitalize(user?.firstName) +
                          " " +
                          capitalize(user?.lastName)}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500">
                        {user?.ruralFinId}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Formik
              initialValues={sendMoneyInitialValues}
              validationSchema={SendMoneySchema}
              onSubmit={handleSendMoneySubmit}
              innerRef={formikRef}
            >
              {() => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      RuralFin ID
                    </label>
                    <Field
                      type="text"
                      // value={ruralFinId}
                      // onChange={(e) => setRuralFinId(e.target.value.toUpperCase())}
                      name="ruralfinId"
                      className="w-full px-4 py-2 border hover:border-black transition-all duration-300 border-gray-200 rounded-lg  focus:ring-black focus:border-transparent"
                      placeholder="Enter RuralFin ID"
                    />
                    <ErrorMessage
                      name="ruralfinId"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="grid-cols-2 grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          ₹
                        </span>
                        <Field
                          type="number"
                          name="amount"
                          className="w-full pl-8 pr-4 py-2 border  hover:border-black transition-all duration-300 border-gray-200 rounded-lg  focus:ring-black focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>
                      <ErrorMessage
                        name="amount"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Remarks
                      </label>
                      <div className="relative">
                        <Field
                          as="select"
                          name="remarks"
                          className="w-full pl-3 cursor-pointer hover:border-black transition-all duration-300 pr-4 py-2 border border-gray-200 rounded-lg  focus:ring-black focus:border-transparent"
                        >
                          <option
                            disabled
                            value=""
                            label={selectPlaceholder}
                          />
                          <option value="Housing" label="Housing" />
                          <option value="Food & Dining" label="Food & Dining" />
                          <option value="Entertainment" label="Entertainment" />
                          <option value="Healthcare" label="Healthcare" />
                          <option value="Transport" label="Transport" />
                          <option value="Education" label="Education" />
                          <option value="Utilities" label="Utilities" />
                          <option value="Others" label="Others" />
                        </Field>
                      </div>
                      <ErrorMessage
                        name="remarks"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Transaction PIN
                    </label>
                    <Field
                      type="password"
                      name="password"
                      maxLength={4}
                      className="w-full px-4 py-2 border hover:border-black transition-all duration-300 border-gray-200 rounded-lg  focus:ring-black focus:border-transparent"
                      placeholder="Enter your Transaction PIN"
                        
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <span>Send Money</span>
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendMoney;
