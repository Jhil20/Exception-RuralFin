import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {createAgent, loginAgent, logoutAgent}from "../controllers/agentController.js"

const routerAgent= Router()
routerAgent.route("/register").post(createAgent)
routerAgent.route("/login").post(loginAgent)
routerAgent.route("/logout").post(verifyJWT,logoutAgent)

export default routerAgent;

