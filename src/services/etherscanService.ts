// import { etherscanAxios } from "@/clients/etherScanAxios";
// import { EtherScanGetTransactions } from "@/types/etherScanTypes";

// export async function getNormalTransactions(address: string): Promise<EtherScanGetTransactions> {
//   const normalTransactions = await etherscanAxios.get("/", {
//     params: {
//       module: "account",
//       action: "txlist",
//       address,
//       startblock: 1,
//       endblock: 99999999,
//       page: 1,
//       offset: 10,
//       sort: "asc",
//     },
//   });

//   return normalTransactions.data;
// }

// export async function getInternalTransactions(address: string): Promise<EtherScanGetTransactions> {
//   const normalTransactions = await etherscanAxios.get("/", {
//     params: {
//       module: "account",
//       action: "txlistinternal",
//       address,
//       startblock: 1,
//       endblock: 2702578,
//       page: 1,
//       offset: 10,
//       sort: "asc",
//     },
//   });

//   return normalTransactions.data;
// }

// export async function getERC20Transactions(address: string): Promise<EtherScanGetTransactions> {
//   const normalTransactions = await etherscanAxios.get("/", {
//     params: {
//       module: "account",
//       action: "txlistinternal",
//       address,
//       startblock: 1,
//       endblock: 2702578,
//       page: 1,
//       offset: 10,
//       sort: "asc",
//     },
//   });

//   return normalTransactions.data;
// }
