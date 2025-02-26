import { pTop } from "../controllers/transactionController.js"
import { Router } from "express";

const transaction = Router();

transaction.route("/userTouser").post(pTop);


export default transaction;