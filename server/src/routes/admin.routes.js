import { Router } from "express";
import {loginAdmin, logoutAdmin } from "../controllers/adminController.js"



const routerAdmin=Router();
routerAdmin.route("/login").post(loginAdmin);
routerAdmin.route("/logout").post(logoutAdmin);


export default routerAdmin