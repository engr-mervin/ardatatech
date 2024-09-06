import express from "express";
import accountRouter from "@/routes/accountRoutes";
const app = express();

const corsOptions = {
  //origin:
};
app.get("/", (_, res) => res.send("HELLO WORLD"));

app.use(express.json({ limit: "10kb" }));
app.use("/api/v1/accounts", accountRouter);

export default app;

/**
 * Considerations:
 *  1. Use redis + etherscan
 *      Pros:
 *          1. Very fast response
 *      Cons:
 *          1. TTL might not display latest data
 *          2. No aggregation capabilities
 *
 *  2. Use redis + mongodb + etherscan
 *      Pros:
 *          1. With aggregation
 *          2. Fast response
 *      Cons:
 *          1. Increased complexity
 *          2. Slow for first transaction query
 *          3. Appending latest transactions using scheduled queries
 *
 *  3. Use etherscan only
 *      Pros:
 *          1. Always getting the latest value
 *      Cons:
 *          1. No aggregations
 *          2. Slow response
 *          3. Too many requests to Etherscan
 *
 *  4. Use mongodb + etherscan
 *      Pros:
 *          1. With aggregation
 *      Cons:
 *          1. Appending latest transactions using scheduled queries
 *          2.
 */
