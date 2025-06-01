const Agent = require("../models/agentModel");
const Finance = require("../models/financeModel");
const User = require("../models/userModel");
const UserToUserTransaction = require("../models/userToUserTransactionModel");
const userToAgentTransaction = require("../models/userToAgentTransactionModel");
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { type } = require("os");

const getAdminOverviewCardData = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
    );
    const startOfNextMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)
    );
    const totalAgents = await Agent.countDocuments();
    // console.log("total agents", totalAgents);
    const userTotalFinance = await Finance.aggregate([
      {
        $group: {
          _id: null,
          totalBalance: { $sum: "$balance" },
          totalUsers: { $sum: 1 },
        },
      },
    ]);
    // console.log("user total finance", userTotalFinance);
    const agentTotalFinance = await Agent.aggregate([
      {
        $group: {
          _id: null,
          totalBalance: { $sum: "$balance" },
          totalAgents: { $sum: 1 },
        },
      },
    ]);
    // console.log("agent total finance", agentTotalFinance);
    const totalBalance =
      userTotalFinance[0]?.totalBalance + agentTotalFinance[0]?.totalBalance ||
      0;
    // console.log("total balance", totalBalance);
    const totalUsers = userTotalFinance[0]?.totalUsers || 0;

    const thisMonthUserTransactions = await UserToUserTransaction.aggregate([
      {
        $match: {
          transactionDate: {
            $gte: startOfMonth,
            $lt: startOfNextMonth,
          },
          status: "completed",
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalTransactions: { $sum: 1 },
        },
      },
    ]);
    // console.log("this month user transactions", thisMonthUserTransactions);
    const thisMonthAgentTransactions = await userToAgentTransaction.aggregate([
      {
        $match: {
          transactionDate: {
            $gte: startOfMonth,
            $lt: startOfNextMonth,
          },
          status: "completed",
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalTransactions: { $sum: 1 },
        },
      },
    ]);

    const thisMonthTransactions =
      (thisMonthUserTransactions[0]?.totalTransactions || 0) +
      (thisMonthAgentTransactions[0]?.totalTransactions || 0);
    // console.log("this month transactions", thisMonthTransactions);
    return res.status(200).json({
      success: true,
      data: {
        totalAgents,
        totalBalance,
        totalUsers,
        thisMonthTransactions,
        thisMonthUserTransactionsAmount:
          thisMonthUserTransactions[0]?.totalAmount || 0,
        thisMonthAgentTransactionsAmount:
          thisMonthAgentTransactions[0]?.totalAmount || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching admin overview card data:", error);
    res
      .status(500)
      .json({ message: "Error fetching admin overview card data", error });
  }
};

const getAdminByPhone = async (req, res) => {
  try {
    const { phoneNumber, role } = req.body;
    const admin = await Admin.findOne({ phone: phoneNumber, role: role });
    if (admin) {
      const token = jwt.sign(
        { id: admin._id, phone: admin.phone },
        "harshp4114",
        { expiresIn: "1h" }
      );
      return res
        .status(200)
        .json({ message: "admin found", success: true, token: token });
    } else {
      return res
        .status(200)
        .json({ message: "admin not found", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin", error });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { firstName, lastName, phone, password } = req.body;
    if (!firstName || !lastName || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingAdmin = await Admin.find({ phone });
    if (existingAdmin.length > 0) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const newAdmin = new Admin({
      firstName,
      lastName,
      phone,
      password: hashedPassword,
    });
    await newAdmin.save();
    return res.status(201).json({
      success: true,
      data: newAdmin,
      message: "Admin created successfully",
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Error creating admin", error });
  }
};

const checkAdminPassword = async (req, res) => {
  try {
    const { phoneNumber, role, password } = req.body;
    console.log("admin id", phoneNumber);
    console.log("role", role);
    console.log("password", password);

    const admin = await Admin.findOne({ phone: phoneNumber, role: role });
    if (!admin) {
      return res
        .status(404)
        .json({ message: "admin not found", success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res
        .status(200)
        .json({ message: "Invalid password", success: false });
    }
    return res.status(200).json({
      message: "Password is valid",
      success: true,
      userId: admin._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Error checking admin password", error });
  }
};

const getRecentActivityData = async (req, res) => {
  try {
    const userCreatedActivity = await User.find(
      {},
      "firstName lastName phone createdAt _id"
    ).sort({ createdAt: -1 });
    const agentCreatedActivity = await Agent.find(
      {},
      "firstName lastName phone createdAt _id"
    ).sort({ createdAt: -1 });
    const userToAgentTransactionsActivity = await userToAgentTransaction
      .find({}, "userId agentId amount transactionDate status")
      .populate("userId", "firstName _id lastName phone")
      .populate("agentId", "firstName _id lastName phone")
      .sort({ transactionDate: -1 });
    const userActivityRefined = userCreatedActivity.map((user) => ({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      createdAt: user.createdAt,
      type: "User Created",
    }));
    const agentActivityRefined = agentCreatedActivity.map((agent) => ({
      _id: agent._id,
      firstName: agent.firstName,
      lastName: agent.lastName,
      phone: agent.phone,
      createdAt: agent.createdAt,
      type: "Agent Created",
    }));
    const userToAgentTransactionsActivityRefined =
      userToAgentTransactionsActivity.map((transaction) => ({
        user: transaction.userId
          ? {
              _id: transaction.userId._id,
              firstName: transaction.userId.firstName,
              lastName: transaction.userId.lastName,
              phone: transaction.userId.phone,
            }
          : null,
        agent: transaction.agentId
          ? {
              _id: transaction.agentId._id,
              firstName: transaction.agentId.firstName,
              lastName: transaction.agentId.lastName,
              phone: transaction.agentId.phone,
            }
          : null,
        amount: transaction.amount,
        transactionDate: transaction.transactionDate,
        status: transaction.status,
        type: "User to Agent Transaction",
      }));
    const allActivities = [
      ...userActivityRefined,
      ...agentActivityRefined,
      ...userToAgentTransactionsActivityRefined,
    ].sort(
      (a, b) =>
        new Date(b.createdAt || b.transactionDate) -
        new Date(a.createdAt || a.transactionDate)
    );
    return res.status(200).json({
      success: true,
      data: allActivities,
    });
  } catch (error) {
    console.error("Error fetching recent activity data:", error);
    res
      .status(500)
      .json({ message: "Error fetching recent activity data", error });
  }
};

module.exports = {
  getAdminOverviewCardData,
  createAdmin,
  getAdminByPhone,
  checkAdminPassword,
  getRecentActivityData,
};
