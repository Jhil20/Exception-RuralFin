import { Router } from "express";
import {loginAdmin, logoutAdmin,allPendingAgents,acceptPendingAgents } from "../controllers/adminController.js"



const routerAdmin=Router();
routerAdmin.route("/login").post(loginAdmin);
routerAdmin.route("/logout").post(logoutAdmin);
routerAdmin.route("/pendingAgents").post(allPendingAgents);
routerAdmin.route("/accptedPendingAgent").post(acceptPendingAgents)

export default routerAdmin