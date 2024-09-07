import mongoose from "@/database/mongoose";
import { IAccount, IAccountMethods, AccountModel } from "@/types/accountTypes";

const accountSchema = new mongoose.Schema<IAccount, AccountModel, IAccountMethods>({
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  address: {
    type: String,
    unique: true,
  },
  transactions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Transaction",
    },
  ],
  lastTaken: {
    type: Date,
    // select: false,
    default: new Date(0),
  },
  lastBlockQueriedOutgoing: {
    type: Number,
    default: 0,
  },
  lastBlockQueriedIncoming: {
    type: Number,
    default: 0,
  },
});

const Account = mongoose.model("Account", accountSchema);
export default Account;
