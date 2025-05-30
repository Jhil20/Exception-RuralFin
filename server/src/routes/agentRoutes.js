const express = require('express');
const { createAgent, getAgentByPhone, getAgentById, getAllAgents, checkAgentPassword } = require('../controllers/agentController');
const router = express.Router();

router.get("/",getAllAgents);
router.post("/checkPassword",checkAgentPassword);
router.post("/register",createAgent);
router.post("/getAgentByPhone",getAgentByPhone);
router.get("/:id",getAgentById);
module.exports = router;