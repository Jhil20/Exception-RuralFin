import { useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import Footer from "../components/Footer";
import BalanceCard from "../components/BalanceCard";
import RecentTransactions from "../components/RecentTransactions";
import ExpenseAnalytics from "../components/ExpenseAnalytics";
import useAuth from "../utils/useAuth";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import capitalize from "../utils/capitalize";
import AgentList from "../components/AgentList";
import SendMoney from "../components/SendMoney";
import { toast } from "react-toastify";
import ViewAll from "../components/ViewAll";
import BudgetPlanningForm from "../components/BudgetPlanningForm";
import DetailedExpenseReport from "../components/DetailedExpenseReport";
import AgentDetails from "../components/AgentDetails";
import AgentsViewMore from "../components/AgentsViewMore";
import { getSocket } from "../utils/socket";
import speak from "../utils/speak";
import speakPremium from "../utils/speakPremium";
const UserDashboard = () => {
  useAuth();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [userFinance, setUserFinance] = useState(null);
  const [showSend, setShowSend] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [otpverified, setOtpVerified] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [budgetPlanningForm, setBudgetPlanningForm] = useState(false);
  const [budgetPlanningEnabled, setBudgetPlanningEnabled] = useState(false);
  const [showDetailedExpense, setShowDetailedExpense] = useState(false);
  const [showAgentDetails, setShowAgentDetails] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showAgentsViewMore, setShowAgentsViewMore] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const token = Cookies.get("token");
  const decoded = useMemo(() => {
    if (token) return jwtDecode(token);
    return null;
  }, [token]);

  useEffect(() => {
    if (!decoded) return;
    const socket = getSocket(decoded?.id);
    const handler = async (data) => {
      setUserFinance((prev) => {
        return {
          ...prev,
          balance: prev.balance + data?.transaction?.amount,
        };
      });

      setTransactionData((prev) => [...prev, data?.transaction]);
      if (data?.transaction?.senderId?._id === decoded?.id) {
        setUserFinance((prev) => {
          return {
            ...prev,
            balance: prev.balance - data?.transaction?.amount,
          };
        });
        toast.success(
          `₹${data?.transaction?.amount} sent to  ${capitalize(
            data?.transaction?.receiverId?.firstName
          )} ${capitalize(data?.transaction?.receiverId?.lastName)}`
        );
        await speakPremium(
          `₹${data?.transaction?.amount} sent to  ${capitalize(
            data?.transaction?.receiverId?.firstName
          )} ${capitalize(data?.transaction?.receiverId?.lastName)}`
        );
      } else {
        setUserFinance((prev) => {
          return {
            ...prev,
            balance: prev.balance + data?.transaction?.amount,
          };
        });
        toast.success(
          `₹${data?.transaction?.amount} received from  ${capitalize(
            data?.transaction?.senderId?.firstName
          )} ${capitalize(data?.transaction?.senderId?.lastName)}`
        );
        await speakPremium(
          `₹${data?.transaction?.amount} received from  ${capitalize(
            data?.transaction?.senderId?.firstName
          )} ${capitalize(data?.transaction?.senderId?.lastName)}`
        );
      }
      getTransactions();
      getUserData();
    };

    const handler2 = (data) => {
      // console.log(
      //   "deposit in user account user dahboard handler TTTTTTTTTTTTTTTTTTT",
      //   data
      // );
      // console.log("user finance data", userFinance);
      setUserFinance((prev) => ({
        ...prev,
        balance: prev.balance + (data?.amount - data?.commission),
      }));
      setTransactionData((prev) => [...prev, data]);
      getTransactions();
      getUserData();
      // console.log("user set done finance data after deposit", userFinance);
    };

    const handler3 = (data) => {
      // console.log("withdraw in user account user dahboard handler", data);
      // console.log("user finance data", userFinance);
      setUserFinance((prev) => ({
        ...prev,
        balance: prev.balance + (data?.amount - data?.commission),
      }));
      setTransactionData((prev) => [...prev, data]);
      getTransactions();
      getUserData();
      // console.log("user set done finance data after withdraw", userFinance);
    };

    socket.on("money-received-by-receiver", handler);
    socket.on("UserAgentDepositCompletedBackend", handler2);
    socket.on("UserAgentWithdrawCompletedBackend", handler3);
    return () => {
      socket.off("UserAgentWithdrawCompletedBackend", handler3);
      socket.off("UserAgentDepositCompletedBackend", handler2);
      socket.off("money-received-by-receiver", handler);
    };
  }, [decoded]);

  useEffect(() => {
    if (transactionSuccess) {
      setTransactionSuccess(false);
      toast.success("Transaction successful");

      // speak("Transaction successful");

      getUserData();
    }
  }, [transactionSuccess]);
  useEffect(() => {
    if (otpverified) {
      setOtpVerified(false);
      toast.success("OTP verified");
    }
  }, [otpverified]);

  const getTransactions = async () => {
    try {
      const result = await axios.get(
        `${BACKEND_URL}/api/userToUserTransaction/getTransactions/${decoded?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("result", result);
      setTransactionData(result?.data?.transactions);
    } catch (err) {
      console.log("error in fetching user-user transactions", err);
    }
    try {
      const result2 = await axios.get(
        `${BACKEND_URL}/api/agentToUserTransaction/byUser/${decoded?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("result2 ttttttttttttttttttttttt", result2);
      setTransactionData((prev) => [...prev, ...result2?.data?.transactions]);
    } catch (err) {
      console.log("error in fetching user-agent transactions", err);
    }
  };

  const getUserData = async () => {
    // dispatch(showLoader());
    try {
      // console.log("hiiii");
      const response = await axios.get(
        `${BACKEND_URL}/api/user/${decoded?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response", response);
      setUserData(response?.data?.data);
      // console.log("FIDDDD", response?.data?.data?.finance);
      const response2 = await axios.get(
        `${BACKEND_URL}/api/finance/${response?.data?.data?.finance}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response fr", response2?.data?.finance);
      setUserFinance(response2?.data?.finance);
    } catch (err) {
      console.log(err);
    } finally {
      // dispatch(hideLoader());
    }
  };

  useEffect(() => {
    getUserData();
    getTransactions();
  }, [decoded]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {showSend && (
        <div className="bg-black/40 flex justify-center items-center fixed top-0 z-50 w-full h-full">
          <SendMoney
            showSend={{ showSend, setShowSend }}
            toastControl={{ setTransactionSuccess, setOtpVerified }}
            user={userData}
            finance={userFinance}
          />
        </div>
      )}

      {viewAll && (
        <div className="bg-black/40 flex justify-center items-center fixed top-0 z-50 w-full h-full">
          <ViewAll
            setViewAll={setViewAll}
            transactionData={transactionData}
            decoded={decoded}
          />
        </div>
      )}

      {budgetPlanningForm && (
        <div className="bg-black/40 flex justify-center items-center fixed top-0 z-50 w-full h-full">
          <BudgetPlanningForm
            setBudgetPlanningForm={setBudgetPlanningForm}
            setBudgetPlanningEnabled={setBudgetPlanningEnabled}
          />
        </div>
      )}
      {showAgentDetails && (
        <div className="bg-black/40 flex justify-center items-center fixed top-0 z-100 w-full h-full">
          <AgentDetails
            setShowAgentDetails={setShowAgentDetails}
            setSelectedAgent={setSelectedAgent}
            showAgentDetails={showAgentDetails}
            selectedAgent={selectedAgent}
          />
        </div>
      )}

      {showAgentsViewMore && (
        <div className="bg-black/40 flex justify-center items-center fixed top-0 z-51 w-full h-full">
          <AgentsViewMore
            setShowAgentsViewMore={setShowAgentsViewMore}
            setShowAgentDetails={setShowAgentDetails}
            setSelectedAgent={setSelectedAgent}
          />
        </div>
      )}

      {showDetailedExpense && (
        <DetailedExpenseReport
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
        />
      )}

      <main className=" mx-auto px-4 sm:px-6 pt-10 pb-12">
        <section className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Hello, {capitalize(userData?.firstName)}{" "}
            {capitalize(userData?.lastName)}
          </h1>
          <p className="text-gray-600">
            Welcome back to your financial dashboard
          </p>
        </section>

        <div className="grid grid-cols-1 h-fit lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1 h-full">
            <BalanceCard
              user={userData}
              balance={userFinance?.balance}
              lastUpdated={userFinance?.updatedAt}
              showSend={{ showSend, setShowSend }}
            />
          </div>

          <div className="lg:col-span-2 h-full">
            <AgentList
              setShowAgentDetails={setShowAgentDetails}
              setSelectedAgent={setSelectedAgent}
              setShowAgentsViewMore={setShowAgentsViewMore}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 h-full lg:grid-cols-3 gap-6 ">
          <div className="lg:col-span-2">
            <RecentTransactions
              transactionData={transactionData}
              decoded={decoded}
              setViewAll={setViewAll}
              budgetPlanningEnabled={budgetPlanningEnabled}
              userFinance={userFinance}
            />
          </div>

          <div className="lg:col-span-1">
            {userFinance?.isBudgetPlanningEnabled || budgetPlanningEnabled ? (
              <ExpenseAnalytics
                setBudgetPlanningForm={setBudgetPlanningForm}
                setShowDetailedExpense={setShowDetailedExpense}
                setIsReportOpen={setIsReportOpen}
              />
            ) : (
              <div className="bg-white  rounded-2xl flex flex-wrap justify-center content-center items-center h-full p-6 shadow-md shadow-gray-300">
                <div className="w-full">
                  <h1 className="text-xl px-16 text-center font-semibold text-gray-800">
                    Budget Planning is not enabled for your account. Enable it
                    to get insights on your spending habits.
                  </h1>
                </div>
                <div className="w-full flex justify-center mt-4">
                  <button
                    onClick={() => setBudgetPlanningForm(true)}
                    className="w-60 h-14 bg-black text-white text-lg rounded-xl font-semibold shadow-lg shadow-gray-400 hover:shadow-gray-700 hover:bg-gray-800 transition-all duration-300 cursor-pointer"
                  >
                    Enable Budget Planning
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <UpcomingPayments payments={upcomingPayments} /> */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;
