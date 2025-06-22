const express = require('express');
const { createAgent, getAgentByPhone, getAgentById, getAllAgents, checkAgentPassword, increaseSecurityDeposit } = require('../controllers/agentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/",authMiddleware,getAllAgents);
router.post("/checkPassword",checkAgentPassword);
router.post("/register",createAgent);
router.post("/getAgentByPhone",getAgentByPhone);
router.get("/:id",authMiddleware,getAgentById);
router.put("/increaseSecurityDeposit",authMiddleware,increaseSecurityDeposit);
module.exports = router;