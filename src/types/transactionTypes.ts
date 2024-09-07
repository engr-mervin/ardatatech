import { HydratedDocument, Model, Types } from "mongoose";

export interface BaseTransaction {
  accountId: Types.ObjectId;
  toAddress: string | null;
  fromAddress: string;
  type: string;
  amount: number | null;
  symbol: string | null;
  decimal: number;
  timestamp: Date;
  txnHash: string;
}

export type ITransaction = {
  createdAt: Date;
  id: Types.ObjectId;
} & BaseTransaction;

export type TransactionResult = BaseTransaction & { id: Types.ObjectId };

export interface ITransactionMethods {}
export type TransactionType = HydratedDocument<ITransaction, ITransactionMethods>;
export type TransactionModel = Model<ITransaction, {}, ITransactionMethods>;
