import { HydratedDocument, Model, Types } from "mongoose";

export interface ITransaction {
  createdAt: Date;
  id: Types.ObjectId;
  accountId: Types.ObjectId;
  toAddress: string;
  fromAddress: string;
  type: string;
  amount: string;
  symbol: string;
  decimal: number;
  timestamp: Date;
  txnHash: string;
}

export interface ITransactionMethods {}
export type TransactionType = HydratedDocument<ITransaction, ITransactionMethods>;
export type TransactionModel = Model<ITransaction, {}, ITransactionMethods>;
