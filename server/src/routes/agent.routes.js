import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
// import {createAgent, loginAgent, logoutAgent,walletCreation,securityDepositPayment}from "../controllers/agentController.js"
import {createAgent,
    loginAgent,
    logoutAgent,
    getAgentById,
    createWallet,
    getAgentWalletByAgentId}from "../controllers/agentController.js"
import { userAgentTransactionDeposit } from "../controllers/transactionController.js";

const routerAgent= Router()
routerAgent.route("/register").post(createAgent)
routerAgent.route("/login").post(loginAgent)
routerAgent.route("/logout").post(verifyJWT,logoutAgent)
routerAgent.route("/walletCreation").post(createWallet)
// routerAgent.route("/verifyPayment").post(verifyPayment)
routerAgent.route("/userDeposit").post(userAgentTransactionDeposit)
routerAgent.route("/getWallet/:agent_id").get(getAgentWalletByAgentId)
routerAgent.route("/:agent_id").get(getAgentById)
export default routerAgent;

