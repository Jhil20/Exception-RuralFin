import { Router } from "express";
import { createUser,loginUser,logoutUser,notificationToUser } from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(createUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/notifyUser").post(notificationToUser)
export default router 