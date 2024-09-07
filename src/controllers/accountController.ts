import { APIError } from "@/classes/APIError";
import { TRANSACTION_REFRESH_INTERVAL } from "@/constants/transactionConstants";
import Account from "@/models/accountModel";
import Transaction from "@/models/transactionModel";
import { getNonNFTIncomingTransactions, getNonNFTOutgoingTransactions } from "@/services/alchemyService";
import { TransactionType } from "@/types/transactionTypes";
import { catchError } from "@/utils/catchError";
import { AssetTransfersWithMetadataResult } from "alchemy-sdk";
import { NextFunction, Request, Response } from "express";

export const getAccount = catchError(async function (req: Request, res: Response, next: NextFunction) {
  const accountId = req.params.accountId;
  if (!accountId) {
    throw new APIError(400, "Account ID is required.");
  }
  const account = await Account.findById(accountId);
  if (!account) {
    throw new APIError(404, "Account is missing.");
  }

  req.account = account;
  next();
});

export const getAccountTransactions = catchError(async function (req: Request, res: Response, next: NextFunction) {
  if (!req.account) {
    throw new APIError(404, "Account is missing.");
  }

  const oldTransactions = (await req.account.populate<{ transactions: TransactionType[] }>({ path: "transactions" })).transactions.slice();
  const currentTimeStamp = new Date();
  let insertedTransactions: TransactionType[] = [];

  if (new Date(req.account.lastTaken).getTime() + TRANSACTION_REFRESH_INTERVAL < currentTimeStamp.getTime()) {
    let allTransactions: AssetTransfersWithMetadataResult[] = [];
    let incomingTransactions = [];
    let outgoingTransactions = [];
    try {
      const results = await Promise.all([
        getNonNFTIncomingTransactions(req.account.address, req.account.lastBlockQueriedIncoming),
        getNonNFTOutgoingTransactions(req.account.address, req.account.lastBlockQueriedOutgoing),
      ]);
      incomingTransactions = results[0];
      outgoingTransactions = results[1];
    } catch (error) {
      throw new APIError(500, "Alchemy request error.");
    }

    if (incomingTransactions.length) {
      req.account.lastBlockQueriedIncoming = parseInt(incomingTransactions[incomingTransactions.length - 1].blockNum, 16);
    }
    if (outgoingTransactions.length) {
      req.account.lastBlockQueriedOutgoing = parseInt(outgoingTransactions[outgoingTransactions.length - 1].blockNum, 16);
    }

    allTransactions = [...incomingTransactions, ...outgoingTransactions];

    const forInsertTransactions = allTransactions.map((transaction) => ({
      accountId: req.account!._id,
      toAddress: transaction.to ?? null,
      fromAddress: transaction.from,
      type: transaction.category,
      amount: transaction.value,
      symbol: transaction.asset ?? null,
      decimal: Number(transaction.rawContract.decimal ?? 18),
      timestamp: new Date(transaction.metadata.blockTimestamp),
      txnHash: transaction.hash,
    }));

    insertedTransactions = await Transaction.insertMany(forInsertTransactions);

    req.account.transactions.push(...insertedTransactions.map((tx) => tx._id));
    req.account.lastTaken = currentTimeStamp;
    await req.account.save();
  }
  const allTransactions = [...insertedTransactions, ...oldTransactions];

  allTransactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  res.status(200).json({
    data: allTransactions,
    count: allTransactions.length,
  });
});

export const createAccount = catchError(async function (req: Request, res: Response, next: NextFunction) {
  if (!req.body.address) {
    throw new APIError(400, "Address is required.");
  }

  const account = await Account.create({
    address: req.body.address,
  });

  return res.status(200).json({
    id: account.id,
  });
});
