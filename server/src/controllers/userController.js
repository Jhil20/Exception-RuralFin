const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { allocateRuralFinId } = require("../utils/allocateRuralFinId");
const Finance = require("../models/financeModel");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    // console.log("req.params.id", req.params.id);
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    res.status(200).json({
      message: "User found",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

const getUserByPhone = async (req, res) => {
  try {
    const { phoneNumber, role } = req.body;
    // console.log("phoneNumber", phoneNumber);
    // console.log("role", role);
    const user = await User.findOne({ phone: phoneNumber, role: role });
    // console.log("user found", user);
    if (user) {
      const token = jwt.sign(
        { id: user._id, phone: user.phone },
        "harshp4114",
        { expiresIn: "1h" }
      );
      return res
        .status(200)
        .json({ message: "User found", success: true, token: token });
    } else {
      return res
        .status(200)
        .json({ message: "User not found", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "password",
      "age",
      "dob",
      "address",
      "gender",
      "aadhar",
    ];
    

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `Missing required field: ${field}`,
        });
      }
    }

    const existingUser = await User.findOne({ phone: req.body.phone });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this phone number already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      phone: req.body.phone,
      aadhar: req.body.aadhar,
      password: hashedPassword,
      lastTransactionDate: null,
      transactionPin:req.body.transactionPin,
    });

    try {
      // Attempt allocation
      await allocateRuralFinId(user._id);
    } catch (err) {
      console.error("First attempt to allocate ruralFinId failed:", err);
      // Retry after random delay (non-blocking retry pattern)
      const randomDelay = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
      setTimeout(async () => {
        try {
          await allocateRuralFinId(user._id);
          console.log("Retry allocation success");
        } catch (retryErr) {
          console.error("Retry allocation still failed:", retryErr);
          await User.findByIdAndDelete(user._id);
          return res.status(400).json({
            success: false,
            message: "Error assinging RuralFin ID. User creation rolled back.",
          });
        }
      }, randomDelay);
    }

    // Always await finance creation properly
    const finance = await Finance.create({
      userId: user._id,
      transactions: [],
    });

    if (!finance) {
      // Clean up the user if finance fails to create
      await User.findByIdAndDelete(user._id);
      return res.status(400).json({
        success: false,
        message: "Error creating finance record. User creation rolled back.",
      });
    }

    user.finance = finance._id;
    await user.save();

    const token = jwt.sign({ id: user._id, phone: user.phone }, "harshp4114", {
      expiresIn: "1h",
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(400).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByPhone,
};
