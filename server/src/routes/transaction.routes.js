import { getWalletIdByUserId, pTop } from "../controllers/transactionController.js"
import { Router } from "express";

const transaction = Router();

transaction.route("/userTouser").post(pTop);
transaction.route("/getWalletByUser/:id").get(getWalletIdByUserId);


export default transaction;