import { HydratedDocument, Model, Types } from "mongoose";

export interface IAccount {
  createdAt: Date;
  id: Types.ObjectId;
  address: string;
  transactions: Types.ObjectId[];
  lastTaken: Date;
  lastTimeStamp: Date;
}

export interface IAccountMethods {}
export type AccountType = HydratedDocument<IAccount, IAccountMethods>;
export type AccountModel = Model<IAccount, {}, IAccountMethods>;
