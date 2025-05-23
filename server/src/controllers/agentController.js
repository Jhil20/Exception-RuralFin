const Agent = require("../models/agentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get all agents
// Get all agents
const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get agent by ID
const getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ message: "Agent not found" });
    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new agent (sync with frontend AgentForm, use bcrypt & jwt)
const createAgent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      age,
      dob,
      gender,
      aadhar,
      address,
      accountNumber,
      password,
      securityDeposit,
      ifscCode,
      bankName,
    } = req.body; // adjust fields as per AgentForm

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
      "accountNumber",
      "ifscCode",
      "bankName",
      "securityDeposit",
    ];
    // console.log(req.body);
    // Check if all required fields are present
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `Missing required field: ${field}`,
        });
      }
    }

    // Check if agent already exists
    const existingAgent = await Agent.findOne({ phone });
    if (existingAgent) {
      return res.status(400).json({ error: "Agent already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create agent
    const agent = Agent.create({
      firstName,
      lastName,
      age,
      dob,
      gender,
      aadhar,
      accountNumber,
      ifscCode,
      bankName,
      securityDeposit:5000,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    if (agent) {
      // Generate JWT
      const token = jwt.sign(
        { id: agent._id, phone: agent.phone },
        "harshp4114",
        { expiresIn: "1h" }
      );

      res.status(201).json({
        success: true,
        message: "Agent created successfully",
        agent,
        token,
      });
    }else{
        res.status(400).json({
            success: false,
            message: "Failed to create agent",
        });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update agent
const updateAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!agent) return res.status(404).json({ message: "Agent not found" });
    res.json(agent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete agent
const deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);
    if (!agent) return res.status(404).json({ message: "Agent not found" });
    res.json({ message: "Agent deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent,
};
