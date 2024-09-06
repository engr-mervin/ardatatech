import mongoose from "@/database/mongoose";
import { ITransaction, ITransactionMethods, TransactionModel } from "@/types/transactionTypes";

const transactionSchema = new mongoose.Schema<ITransaction, TransactionModel, ITransactionMethods>({
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  accountId: {
    type: mongoose.Schema.ObjectId,
    ref: "Account",
  },
  toAddress: {
    type: String,
  },
  fromAddress: {
    type: String,
  },
  type: {
    type: String,
  },
  amount: {
    type: String,
  },
  decimal: {
    type: Number,
  },
  timestamp: {
    type: Date,
  },
  txnHash: {
    type: String,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
