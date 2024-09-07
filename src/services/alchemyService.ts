import { Alchemy, AssetTransfersCategory, Network } from "alchemy-sdk";
import { ENV } from "config";

const config = {
  apiKey: ENV.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

//FOR IMPROVEMENT: Retry on error
export async function getNonNFTOutgoingTransactions(address: string, limit = 15) {
  let data = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    fromAddress: address,
    withMetadata: true,
    category: [AssetTransfersCategory.INTERNAL, AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC20],
    maxCount: limit,
  });

  const transactions = data.transfers;

  while (data.pageKey && transactions.length < limit) {
    data = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      fromAddress: address,
      withMetadata: true,
      category: [AssetTransfersCategory.INTERNAL, AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC20],
      pageKey: data.pageKey,
      maxCount: limit,
    });

    transactions.push(...data.transfers);
  }

  return transactions;
}

export async function getNonNFTIncomingTransactions(address: string, limit = 15) {
  let data = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    fromAddress: address,
    withMetadata: true,
    category: [AssetTransfersCategory.INTERNAL, AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC20],
    maxCount: limit,
  });

  const transactions = data.transfers;

  while (data.pageKey && transactions.length < limit) {
    data = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      toAddress: address,
      withMetadata: true,
      category: [AssetTransfersCategory.INTERNAL, AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC20],
      pageKey: data.pageKey,
      maxCount: limit,
    });

    transactions.push(...data.transfers);
  }

  return transactions;
}
