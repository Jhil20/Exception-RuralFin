import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
// import {createAgent, loginAgent, logoutAgent,walletCreation,securityDepositPayment}from "../controllers/agentController.js"
import {createAgent, loginAgent,createWallet,getKey, logoutAgent, getAgentById, getAgentWalletByAgentId,createOrder}from "../controllers/agentController.js"
import { userAgentTransactionDeposit } from "../controllers/transactionController.js";

const routerAgent= Router()
routerAgent.route("/register").post(createAgent)
routerAgent.route("/login").post(loginAgent)
routerAgent.route("/logout").post(verifyJWT,logoutAgent)
routerAgent.route("/userDeposit").post(userAgentTransactionDeposit)
routerAgent.route("/walletCreation").post(createWallet)
routerAgent.route("/getKey").get(getKey);
routerAgent.route("/create-order").post(createOrder);
routerAgent.route("/:agent_id").get(getAgentById)
routerAgent.route("/getWallet/:agent_id").get(getAgentWalletByAgentId)
export default routerAgent;

