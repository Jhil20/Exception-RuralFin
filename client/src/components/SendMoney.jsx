import React, { useEffect, useRef, useState } from "react";
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
import { toast, ToastContainer } from "react-toastify";
import capitalize from "../utils/capitalize";

export const SendMoney = ({ showSend, user, finance }) => {
  const [step, setStep] = useState("form");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [ruralfinValue, setRuralFinValue] = useState("");
  // const [ruralfinValue, setFavRuralFinId] = useState("");
  const [ruralFinId, setRuralFinId] = useState("");
  const [isValidId, setIsValidId] = useState(null);
  const [disableFav, setDisableFav] = useState(true);
  const [addFavourites, setAddFavourites] = useState(false);
  const formikRef = useRef();
  const setShowSend = showSend.setShowSend;

  const users = [
    { id: "1", name: "John Doe", ruralfinId: "RF001", avatar: "JD" },
    { id: "2", name: "Jane Smith", ruralfinId: "RF002", avatar: "JS" },
    { id: "3", name: "Mike Johnson", ruralfinId: "RF003", avatar: "MJ" },
    { id: "4", name: "Sarah Wilson", ruralfinId: "RF004", avatar: "SW" },
  ];

  useEffect(() => {
    getFavourites();
  }, []);

  const debouncedCheckRuralFinId = debounce(async (id) => {
    if (id.endsWith("@RURALFIN")) {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/user/validate/${id}`
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

  const sendMoneyInitialValues = { ruralfinId: "", amount: "", password: "" ,remarks:""};
  const addFavouritesInitialValues = { ruralFinId: "" };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleSendMoneySubmit = async (values) => {
    const { ruralfinId, amount, password,remarks } = values;
    if (finance?.balance < amount) {
      toast.error("Insufficient balance");
      return;
    }
    try{

      const response=await axios.post(`${BACKEND_URL}/api/userToUserTransaction/`, {senderId:user._id,receiverRuralId:ruralfinId,amount,remarks,password})
      console.log("response", response);
    }catch(err){
      if(err?.response?.data?.message=="Transaction PIN is incorrect"){
        toast.error("Transaction PIN is incorrect");
        return;
      }
      console.log("Error in transaction", err);
      toast.error("Transaction failed");
      return;
    }
    setStep("otp");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    console.log("Transfer completed");
    setStep("form");
    setSelectedUser(null);
    setAmount("");
    setPassword("");
    setOtp("");
    setRuralFinValue("");
  };

  const getFavourites = async () => {
    console.log("called");
    const fav = user?.favourites || [];
    const result = await Promise.all(
      fav.map(async (f) => {
        const response = await axios.get(`${BACKEND_URL}/api/user/${f}`);
        return response.data;
      })
    );
    console.log("result", result);
    setFavourites(result);
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
        { userId: user._id, ruralFinId: ruralfinValue }
      );
      console.log("response", response);
      if (response?.data?.success) {
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

  if (step === "otp") {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Verify Transfer
          </h2>
          <button
            onClick={() => setStep("form")}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Back to form
          </button>
        </div>
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              Sending to: {selectedUser ? selectedUser.name : "Unknown"}
            </p>
            <p className="text-lg font-semibold">${amount}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP sent to your phone
            </label>
            <input
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
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Confirm Transfer</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white w-2/3 rounded-xl shadow-lg p-6 relative">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
      <div className="flex items-center justify-between mb-6">
        <X
          onClick={() => setShowSend(false)}
          className="text-gray-800 p-1 h-9 w-9 transition-all duration-500 hover:bg-gray-200 rounded-lg cursor-pointer"
        />
        <h2 className="text-xl font-semibold text-gray-900">Send Money</h2>
        <div className="relative">
          {addFavourites ? (
            <X
              onClick={() => setAddFavourites(false)}
              className="text-gray-800 p-2 h-10 bg-gray-200 w-10 transition-all duration-500 hover:bg-gray-200 rounded-lg cursor-pointer"
            />
          ) : (
            <Users
              onClick={() => setAddFavourites(true)}
              className="h-10 w-10 text-gray-800 cursor-pointer hover:bg-gray-200 transition-all duration-500 p-2 rounded-lg"
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
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or RuralFin ID"
            className={`w-full pl-10 pr-4 py-2 border ${
              favourites.length === 0 ? "cursor-not-allowed" : "cursor-alias"
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
          ) : (
            favourites.map((user) => (
              <div
                key={user?.data?.id}
                onClick={() => {
                  handleUserSelect(user);
                  setRuralFinId(user?.data?.ruralFinId);
                  formikRef.current?.setFieldValue(
                    "ruralfinId",
                    user?.data?.ruralFinId
                  );
                  // setFieldValue("ruralFinId", user?.data?.ruralFinId);
                }}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedUser?.data?.id === user?.data?.id
                    ? "bg-gray-100"
                    : "hover:bg-gray-50"
                }`}
              >
                {console.log("user selected", selectedUser, user?.data?.id)}
                <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {user?.data?.firstName[0].toUpperCase() +
                      user?.data?.lastName[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {capitalize(user?.data?.firstName) +
                      " " +
                      capitalize(user?.data?.lastName)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user?.data?.ruralFinId}
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
          {({ isSubmitting, isValid, dirty }) => (
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
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg  focus:ring-black focus:border-transparent"
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
                      $
                    </span>
                    <Field
                      type="number"
                      name="amount"
                      className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg  focus:ring-black focus:border-transparent"
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
                      className="w-full pl-3 cursor-pointer pr-4 py-2 border border-gray-200 rounded-lg  focus:ring-black focus:border-transparent"
                    >
                      <option disabled value="" label="Please select a remark" />
                      <option value="Housing" label="Housing" />
                      <option value="Food & Dining" label="Food & Dining" />
                      <option value="Entertainment" label="Entertainment" />
                      <option value="Transport" label="Transport" />
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
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg  focus:ring-black focus:border-transparent"
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
                // disabled={isSubmitting || (isValid && !dirty)}
                className="w-full cursor-pointer bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
                <span>Send Money</span>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SendMoney;
