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
    if (!agent) return res.status(404).json({ message: "Agent not found", success: false });
    res.json({agent,message: "Agent found", success: true});
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
    console.log(req.body);
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
      return res.status(400).json({ error: "Profile with this phone already exists" });
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
      securityDeposit:securityDeposit,
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


const getAgentByPhone = async (req, res) => {
  try {
    // console.log("getAgentByPhone called");
    const { phoneNumber, role } = req.body;
    // console.log("phoneNumber", phoneNumber);
    // console.log("role", role);
    const agent = await Agent.findOne({ phone: phoneNumber, role: role });
    // console.log("agent found", agent);
    if (agent) {
      const token = jwt.sign(
        { id: agent._id, phone: agent.phone },
        "harshp4114",
        { expiresIn: "1h" }
      );
      return res
        .status(200)
        .json({ message: "Agent found", success: true, token: token });
    } else {
      return res
        .status(200)
        .json({ message: "Agent not found", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching Agent", error });
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
  getAgentByPhone,
};
