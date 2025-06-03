import { useEffect, useMemo, useRef, useState } from "react";
import {
  Save,
  RefreshCw,
  Lock,
  Bell,
  DollarSign,
  Percent,
  Clock,
} from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import { Formik } from "formik";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const PlatformSettings = () => {
  const [uptime, setUptime] = useState("Calculating...");
  const [deployTime, setDeployTime] = useState(null);
  const [upTimeInterval, setUpTimeInterval] = useState(null);
  const [systemSettings, setSystemSettings] = useState({});
  const formikFormTransaction = useRef(null);
  const formikFormFee = useRef(null);
  const getUpTime = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/uptime`);
      // console.log("Uptime response:", response.data);
      const startTime = new Date(response.data.startTime);
      setDeployTime(startTime);
      const interval = setInterval(() => {
        const now = new Date();
        const diffMs = now - startTime;

        const seconds = Math.floor((diffMs / 1000) % 60);
        const minutes = Math.floor((diffMs / 1000 / 60) % 60);
        const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        // console.log("Uptime:", days, "days", hours, "hours", minutes, "minutes");
        setUptime(`${days}d ${hours}h ${minutes}m`);
      }, 60000);
      setUpTimeInterval(interval);
    } catch (error) {
      console.error("Error fetching uptime:", error);
    }
  };
  const token = Cookies.get("token");
  const decoded = useMemo(() => {
    if (!token) {
      return null;
    }
    return jwtDecode(token);
  }, [token]);
  useEffect(() => {
    getUpTime();
    // createSystem();
    getSystemSettings();
    if (upTimeInterval) {
      clearInterval(upTimeInterval);
    }
  }, []);

  // const createSystem=async()=>{
  //   try{
  //     const response=await axios.post(`${BACKEND_URL}/api/admin/createSystem`);
  //     console.log("System created successfully:", response.data);
  //   }catch(error){
  //     console.error("Error creating system:", error);
  //   }
  // }

  const getSystemSettings = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/admin/getSystemSettings`
      );
      console.log("System settings fetched successfully:", response.data);
      setSystemSettings(response.data.data);
    } catch (error) {
      console.error("Error fetching system settings:", error);
    }
  };

  const systemStats = [
    { label: "System Uptime", value: uptime },
    {
      label: "Last Deployment",
      value: new Date(deployTime).toLocaleDateString(),
    },
    { label: "Active Users Today", value: "8,452" },
  ];

  const handleSaveSettings = async () => {
    try {
      const values = {
        maxSingleTransaction:
          formikFormTransaction.current.values["max-single-transaction"],
        maxDailyLimit: formikFormTransaction.current.values["max-daily-limit"],
        maxWeeklyLimit:
          formikFormTransaction.current.values["max-weekly-limit"],
        minTransactionAmount:
          formikFormTransaction.current.values["min-transaction"],
        transactionFee500to999:
          formikFormFee.current.values["transaction-fee-500-999"],
        transactionFee1000to4999:
          formikFormFee.current.values["transaction-fee-1000-4999"],
        transactionFee5000to9999:
          formikFormFee.current.values["transaction-fee-5000-9999"],
        transactionFee10000:
          formikFormFee.current.values["transaction-fee-10000"],
        updatedBy: decoded.id,
      };
      const response = await axios.post(
        `${BACKEND_URL}/api/admin/updateSystemSettings`,
        values
      );
      console.log("Settings saved successfully:", response.data);
      if(response.data.success){
        toast.success("Settings saved successfully!");
        getSystemSettings();
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  return (
    <div className="space-y-6 p-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Platform Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <Clock size={20} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Limits Form */}
        <Formik
          innerRef={formikFormTransaction}
          enableReinitialize
          initialValues={{
            "max-single-transaction": systemSettings?.maxSingleTransaction ?? 0,
            "max-daily-limit": systemSettings?.maxDailyLimit ?? 0,
            "max-weekly-limit": systemSettings?.maxWeeklyLimit ?? 0,
            "min-transaction": systemSettings?.minTransactionAmount ?? 1,
          }}
          onSubmit={(values) => {
            console.log("Transaction Limits Submitted:", values);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Card>
                <div className="flex items-start mb-6">
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-600 mr-3">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Transaction Limits
                    </h2>
                    <p className="text-gray-500">
                      Configure maximum transaction amounts and daily limits
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      id: "max-single-transaction",
                      label: "Maximum Single Transaction (₹)",
                    },
                    {
                      id: "max-daily-limit",
                      label: "Maximum Daily Limit (₹)",
                    },
                    {
                      id: "max-weekly-limit",
                      label: "Maximum Weekly Limit (₹)",
                    },
                    {
                      id: "min-transaction",
                      label: "Minimum Transaction Amount (₹)",
                    },
                  ].map((field) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
                    >
                      <label
                        htmlFor={field.id}
                        className="font-medium text-gray-700"
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type="number"
                        className="input-field border-2 py-1 px-2 hover:border-gray-500 transition-all duration-400 border-gray-300 rounded-md"
                        value={values[field.id]}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </form>
          )}
        </Formik>

        {/* Fee Configuration Form */}
        <Formik
          innerRef={formikFormFee}
          enableReinitialize
          initialValues={{
            "transaction-fee-500-999":
              systemSettings?.transactionFee500to999 ?? 0,
            "transaction-fee-1000-4999":
              systemSettings?.transactionFee1000to4999 ?? 0,
            "transaction-fee-5000-9999":
              systemSettings?.transactionFee5000to9999 ?? 0,
            "transaction-fee-10000": systemSettings?.transactionFee10000 ?? 0,
          }}
          onSubmit={(values) => {
            console.log("Fee Configuration Submitted:", values);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Card>
                <div className="flex items-start mb-6">
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-600 mr-3">
                    <Percent size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Fee Configuration
                    </h2>
                    <p className="text-gray-500">
                      Set transaction fees for user-agent transactions and agent
                      commissions
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      id: "transaction-fee-500-999",
                      label: "Transaction Fee for ₹500-₹999 (%)",
                    },
                    {
                      id: "transaction-fee-1000-4999",
                      label: "Transaction Fee for ₹1000-₹4999 (%)",
                    },
                    {
                      id: "transaction-fee-5000-9999",
                      label: "Transaction Fee for ₹5000-₹9999 (%)",
                    },
                    {
                      id: "transaction-fee-10000",
                      label: "Transaction Fee for ₹10000+ (%)",
                    },
                  ].map((field) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
                    >
                      <label
                        htmlFor={field.id}
                        className="font-medium text-gray-700"
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type="number"
                        className="input-field border-2 py-1 px-2 hover:border-gray-500 transition-all duration-400 border-gray-300 rounded-md"
                        value={values[field.id]}
                        max={100}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </form>
          )}
        </Formik>
        <div className="flex items-center gap-3">
          <button
          className="bg-white flex items-center cursor-pointer px-4 py-2 text-black focus:ring-white hover:bg-gray-800 hover:text-white hover:ring-2 hover:ring-gray-600 font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2  disabled:opacity-50 disabled:cursor-not-allowed "
            onClick={handleSaveSettings}
          >
            <span className={`mr-2`}>{<Save size={18} />}</span>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlatformSettings;
