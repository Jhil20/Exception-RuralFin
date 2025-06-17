const AdminCommission = require("../models/adminCommissionModel");
const { getAdminId } = require("./adminController");

const increaseAdminCommission = async ({ adminId, commission }) => {
  try {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    console.log(
      "Increasing commission for admin:",
      adminId,
      "by amount:",
      commission
    );

    let adminCommission = await AdminCommission.findOne({
      adminId: adminId,
      month: month,
      year: year,
    });

    if (!adminCommission) {
      adminCommission = new AdminCommission({
        adminId: adminId,
        month: month,
        year: year,
        totalCommissionEarned: 0,
      });
    }

    adminCommission.totalCommissionEarned += commission;
    await adminCommission.save();

    return {
      success: true,
      message: "Admin commission updated successfully",
      data: adminCommission,
    };
  } catch (error) {
    console.error("Error updating admin commission:", error);
    return {
      success: false,
      message: "Error updating admin commission",
      error,
    };
  }
};

const getAllAdminCommissions = async (req, res) => {
  try {
    const adminId = await getAdminId();
    console.log("Fetching all commissions for admin:", adminId);
    if (!adminId) {
      return res
        .status(400)
        .json({ message: "Admin ID is required", success: false });
    }
    const commissions = await AdminCommission.find({ adminId: adminId }).sort({
      month: -1,
      year: -1,
    });
    if (!commissions || commissions.length === 0) {
      return res
        .status(404)
        .json({
          message: "No commissions found for this admin",
          success: false,
        });
    }
    return res
      .status(200)
      .json({
        message: "Commissions retrieved successfully",
        success: true,
        data: commissions,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  increaseAdminCommission,
  getAllAdminCommissions,
};
