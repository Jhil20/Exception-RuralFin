const Agent = require("../models/agentModel");
const Finance = require("../models/financeModel");
const UserToUserTransaction = require("../models/userToUserTransactionModel");
const userToAgentTransaction = require("../models/userToAgentTransactionModel");
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
    console.log("total agents", totalAgents);
    const userTotalFinance = await Finance.aggregate([
      {
        $group: {
          _id: null,
          totalBalance: { $sum: "$balance" },
          totalUsers: { $sum: 1 },
        },
      },
    ]);
    console.log("user total finance", userTotalFinance);
    const agentTotalFinance = await Agent.aggregate([
      {
        $group: {
          _id: null,
          totalBalance: { $sum: "$balance" },
          totalAgents: { $sum: 1 },
        },
      },
    ]);
    console.log("agent total finance", agentTotalFinance);
    const totalBalance =
      userTotalFinance[0]?.totalBalance + agentTotalFinance[0]?.totalBalance ||
      0;
    console.log("total balance", totalBalance);
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
    console.log("this month user transactions", thisMonthUserTransactions);
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
    console.log(
      "this month agent transactions",
      thisMonthAgentTransactions[0]?.totalTransactions
    );
    const thisMonthTransactions =
      (thisMonthUserTransactions[0]?.totalTransactions || 0) +
      (thisMonthAgentTransactions[0]?.totalTransactions || 0);
    console.log("this month transactions", thisMonthTransactions);
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

module.exports = {
  getAdminOverviewCardData,
};
