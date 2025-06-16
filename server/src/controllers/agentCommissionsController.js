const AgentCommission = require("../models/agentCommissionModel");

const getThisMonthCommission = async (req, res) => {
  const { agentId } = req.body;
  try {
    // console.log("Fetching commission for agent:", agentId);
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    // console.log("Current Month:", month, "Year:", year);
    const commission = await AgentCommission.findOne({
      agentId: agentId,
      month: month,
      year: year,
    });
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

const increaseAgentCommission=async(param)=>{
  const { agentId, amount } = param;
  try {
    console.log("Increasing commission for agent:", agentId, "by amount:", amount);
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    console.log("Current Month:", month, "Year:", year);
    
    let commission = await AgentCommission.findOne({
      agentId: agentId,
      month: month,
      year: year,
    });

    if (!commission) {
      commission = new AgentCommission({
        agentId: agentId,
        month: month,
        year: year,
        totalCommissionEarned: 0,
      });
    }

    commission.totalCommissionEarned += amount;
    await commission.save();

    return {
      success: true,
      message: "Commission updated successfully",
      data: commission,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error updating commission",
      error: error.message,
    };
  }
}

module.exports = {
  getThisMonthCommission,
  increaseAgentCommission,
};
