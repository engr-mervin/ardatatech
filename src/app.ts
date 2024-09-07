import express from "express";
import accountRouter from "@/routes/accountRoutes";
import { errorHandler } from "./controllers/errorController";
const app = express();

const corsOptions = {
  //origin:
};
app.get("/", (_, res) => res.send("HELLO WORLD"));

app.use(express.json({ limit: "10kb" }));
app.use("/api/v1/account", accountRouter);

app.use(errorHandler);
export default app;
