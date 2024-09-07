export const ENV = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "local",
  ETHERSCAN_URL: process.env.ETHERSCAN_URL,
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY || "",
  MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING || "",
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD || "",
  MONGODB_USERNAME: process.env.MONGODB_USERNAME || "",
  ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY || "",
};
