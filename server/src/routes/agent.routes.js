import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {createAgent, loginAgent, logoutAgent,walletCreation}from "../controllers/agentController.js"

const routerAgent= Router()
routerAgent.route("/register").post(createAgent)
routerAgent.route("/login").post(loginAgent)
routerAgent.route("/logout").post(verifyJWT,logoutAgent)
routerAgent.route("/walletCreation").post(walletCreation)
export default routerAgent;

