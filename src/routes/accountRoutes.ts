import { createAccount, getAccount, getAccountTransactions } from "@/controllers/accountController";
import { Router } from "express";

const router = Router();

//accountId routes
router.post("", createAccount);
router.use("/:accountId", getAccount);
router.get("/:accountId/transactions", getAccountTransactions);

export default router;
