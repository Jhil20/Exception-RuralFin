const express = require('express');
const { createAgent, getAgentByPhone, getAgentById } = require('../controllers/agentController');
const router = express.Router();


router.post("/register",createAgent);
router.post("/getAgentByPhone",getAgentByPhone);
router.get("/:id",getAgentById);
module.exports = router;