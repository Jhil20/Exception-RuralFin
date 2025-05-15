import React, { useState } from "react";
import { Search, Send, Users, ArrowRight } from "lucide-react";
import { X } from "lucide-react";
export const SendMoney = ({showSend}) => {
  const [step, setStep] = useState("form");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [ruralfinId, setRuralfinId] = useState("");
  const setShowSend=showSend.setShowSend;

  const users = [
    { id: "1", name: "John Doe", ruralfinId: "RF001", avatar: "JD" },
    { id: "2", name: "Jane Smith", ruralfinId: "RF002", avatar: "JS" },
    { id: "3", name: "Mike Johnson", ruralfinId: "RF003", avatar: "MJ" },
    { id: "4", name: "Sarah Wilson", ruralfinId: "RF004", avatar: "SW" },
  ];



  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.ruralfinId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setRuralfinId(user.ruralfinId);
  };

  const handleRuralfinIdChange = (e) => {
    setRuralfinId(e.target.value);
    setSelectedUser(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    setRuralfinId("");
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
              Sending to:{" "}
              {selectedUser ? selectedUser.name : `RuralFin ID: ${ruralfinId}`}
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
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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
    <div className="bg-white w-2/3  rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <X onClick={()=>setShowSend(false)} className="cursor-pointer"/>
        <h2 className="text-xl font-semibold text-gray-900">Send Money</h2>
        <Users className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or RuralFin ID"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div className="max-h-52 mb-5 overflow-y-auto space-y-2">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                selectedUser && selectedUser.id === user.id
                  ? "bg-gray-100"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {user.avatar}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.ruralfinId}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              RuralFin ID
            </label>
            <input
              type="text"
              value={ruralfinId}
              onChange={handleRuralfinIdChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Enter RuralFin ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!ruralfinId || !amount || !password}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
            <span>Send Money</span>
          </button>
        </form>
      </div>
    </div>
  );
};
export default SendMoney;
