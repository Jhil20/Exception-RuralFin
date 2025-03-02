import { Router } from "express";
import {loginAdmin, logoutAdmin,allPendingAgents,acceptPendingAgent } from "../controllers/adminController.js"



const routerAdmin=Router();
routerAdmin.route("/login").post(loginAdmin);
routerAdmin.route("/logout").post(logoutAdmin);
routerAdmin.route("/pendingAgents").get(allPendingAgents);
routerAdmin.route("/acceptPendingAgent").post(acceptPendingAgent)


export default routerAdmin