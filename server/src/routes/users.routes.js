import { Router } from "express";
import { createUser,loginUser,logoutUser, totalAgent,notificationToUser,getAllUser,getUserById,getWalletId,userActivity,getUserByWalletId} from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllTransactionUser } from "../controllers/transactionController.js";

const router = Router()

router.route("/").get(getAllUser)
router.route("/register").post(createUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/getagent").get(totalAgent)
router.route("/notifyUser").post(notificationToUser)
router.route("/getAllTransaction").post(getAllTransactionUser)
router.route("/getAllUser").get(getAllUser);
router.route("/userActivity").get(userActivity)
router.route("/:id").get(getUserById);
router.route("/getWallet/:id").get(getWalletId);
router.route("/getUserByWallet/:id").post(getUserByWalletId);
export default router