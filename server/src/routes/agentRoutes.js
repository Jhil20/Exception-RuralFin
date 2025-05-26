const express = require('express');
const { createAgent, getAgentByPhone, getAgentById, getAllAgents } = require('../controllers/agentController');
const router = express.Router();

router.get("/",getAllAgents);
router.post("/register",createAgent);
router.post("/getAgentByPhone",getAgentByPhone);
router.get("/:id",getAgentById);
module.exports = router;