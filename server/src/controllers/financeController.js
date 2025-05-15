const Finance = require("../models/financeModel");

const getFinanceById = async (req, res) => {
  try {
    const finance = await Finance.findById(req.params.id);
    if (!finance) {
      return res
        .status(404)
        .json({ message: "Finance record not found", success: false });
    }
    return res
      .status(200)
      .json({ finance, message: "Finance record found", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error fetching finance record",
        error,
        success: false,
      });
  }
};

module.exports = {
  getFinanceById,
};
