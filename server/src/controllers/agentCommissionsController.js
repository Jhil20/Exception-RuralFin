const AgentCommission = require("../models/agentCommissionModel");
const moment = require("moment");

const getThisMonthCommission = async (req, res) => {

    const {agentId}=req.body;
  try {
    console.log("Fetching commission for agent:", agentId);
    const date = new Date();
    const month=date.getMonth()+1;
    const year = date.getFullYear();
    console.log("Current Month:", month, "Year:", year);
    const commission = await AgentCommission.findOne({
        agentId: agentId,
        month: month,
        year: year,
    })
    if (!commission) {
      return res.status(404).json({
        message: "No commission found for this month",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Commission fetched successfully",
      success: true,
      data: commission.totalCommissionEarned,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  getThisMonthCommission,
};
