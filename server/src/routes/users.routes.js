import { Router } from "express";
import { createUser,loginUser,logoutUser, totalAgent,notificationToUser,getAllUser,getUserById,getWalletId } from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllTransactionUser } from "../controllers/transactionController.js";

const router = Router()

router.route("/register").post(createUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/getagent").get(totalAgent)
router.route("/notifyUser").post(notificationToUser)
router.route("/getAllTransaction").post(getAllTransactionUser)
router.route("/getAllUser").get(getAllUser);
router.route("/getById").get(getUserById);
router.route("/getWallet").get(getWalletId);

export default router 