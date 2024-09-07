import { Alchemy, AssetTransfersCategory, AssetTransfersWithMetadataResponse, AssetTransfersWithMetadataResult, Network } from "alchemy-sdk";
import { ENV } from "config";

const config = {
  apiKey: ENV.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);
const limit = ENV.NODE_ENV === "development" ? 15 : 1000; //For presentation

// Function to fetch transactions with pagination
async function fetchTransactions(address: string, lastBlockQueried: number, toAddress: string | undefined, fromAddress: string | undefined) {
  let transactions: AssetTransfersWithMetadataResult[] = [];
  let pageKey: string | undefined = undefined;

  do {
    const data: AssetTransfersWithMetadataResponse = await alchemy.core.getAssetTransfers({
      fromBlock: `0x${(lastBlockQueried + 1).toString(16)}`, // Start from the next block
      toAddress,
      fromAddress,
      withMetadata: true,
      category: [AssetTransfersCategory.INTERNAL, AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC20],
      pageKey,
      maxCount: limit,
    });

    transactions.push(...data.transfers);
    pageKey = data.pageKey;
  } while (pageKey && transactions.length < limit);

  return transactions;
}

export async function getNonNFTOutgoingTransactions(address: string, lastBlockQueriedOutgoing: number) {
  return fetchTransactions(address, lastBlockQueriedOutgoing, undefined, address);
}

export async function getNonNFTIncomingTransactions(address: string, lastBlockQueriedIncoming: number) {
  return fetchTransactions(address, lastBlockQueriedIncoming, address, undefined);
}
