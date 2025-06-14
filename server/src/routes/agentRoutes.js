const express = require('express');
const { createAgent, getAgentByPhone, getAgentById, getAllAgents, checkAgentPassword, increaseSecurityDeposit } = require('../controllers/agentController');
const router = express.Router();

router.get("/",getAllAgents);
router.post("/checkPassword",checkAgentPassword);
router.post("/register",createAgent);
router.post("/getAgentByPhone",getAgentByPhone);
router.get("/:id",getAgentById);
router.put("/increaseSecurityDeposit",increaseSecurityDeposit);
module.exports = router;