import { getAccountTransactions } from "@/controllers/accountController";
import { Router } from "express";

const router = Router();

router.get("/:accountId/transactions", getAccountTransactions);

export default router;
