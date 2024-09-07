# Transaction Aggregation and Querying Service

## Overview

This project provides a service for querying transactions associated with accounts. It uses Alchemy's API to fetch transaction data and stores it in MongoDB. The service is designed to handle querying or aggregation should the need arise.

## Models

### Account

The `Account` model represents a user or entity with a collection of transactions.

- **Fields:**
  - `address`: The Ethereum address associated with the account.
  - `transactions`: An array of references to the `Transaction` model.
  - `lastTaken`: A timestamp indicating when the transactions were last fetched.
  - `lastBlockQueriedOutgoing`: The block number of the last block queried for outgoing transactions.
  - `lastBlockQueriedIncoming`: The block number of the last block queried for incoming transactions.

### Transaction

The `Transaction` model represents a single transaction related to an account.

- **Fields:**
  - `accountId`: Reference to the `Account` this transaction belongs to.
  - `toAddress`: The recipient's address.
  - `fromAddress`: The sender's address.
  - `type`: The type of transaction (e.g., ERC20, internal).
  - `amount`: The amount of tokens involved in the transaction.
  - `symbol`: The token symbol (e.g., ETH, DAI).
  - `decimal`: The number of decimals for the token.
  - `timestamp`: The block timestamp of the transaction.
  - `txnHash`: The transaction hash.

## Data Fetching Strategy

- **Endpoint Usage:**

  - **Querying:** Uses a refresh strategy where transactions are updated based on a configurable interval `TRANSACTION_REFRESH_INTERVAL`. If the interval is set to 0, the service will always fetch the latest values.

- **Fetching Logic:**
  - If `lastTaken` + refresh interval is less than the current time, fetch data from MongoDB.
  - Otherwise, fetch the latest values from Alchemy based on the last queried block.

## Configuration

- **Refresh Interval:** Configurable interval for refreshing the transaction data. Set to 0 for always fetching the latest values.
- **Alchemy Service Limit:** Currently limited to 15 records for presentation purposes. This limit is only on DEV environment.

## Running the Project Locally

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Start the Development Server:**

   ```bash
   npm run dev
   ```

## Running the Project in Prod

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Start the Production Server:**

   ```bash
   npm run prod
   ```

## For Improvements

1. **Identify if a transaction is a spam token or a legitimate one**
2. **Build typescript on prod**
3. **API validation and tests, validate response schema**
4. **Add an endpoint to return the different currency/token balances for an account.**
