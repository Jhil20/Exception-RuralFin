import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {createAgent, loginAgent, logoutAgent,walletCreation,securityDepositPayment}from "../controllers/agentController.js"
import {createAgent, loginAgent, logoutAgent,walletCreation,securityDepositPayment,verifyPayment}from "../controllers/agentController.js"
import { userAgentTransactionDeposit } from "../controllers/transactionController.js";

const routerAgent= Router()
routerAgent.route("/register").post(createAgent)
routerAgent.route("/login").post(loginAgent)
routerAgent.route("/logout").post(verifyJWT,logoutAgent)
routerAgent.route("/walletCreation").post(walletCreation)
routerAgent.route("/securityPayment").post(securityDepositPayment)
// routerAgent.route("/verifyPayment").post(verifyPayment)
routerAgent.route("/verifyPayment").post(verifyPayment)
routerAgent.route("/userDeposit").post(userAgentTransactionDeposit)
export default routerAgent;

