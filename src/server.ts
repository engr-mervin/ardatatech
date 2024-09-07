import "dotenv/config";
import app from "@/app";
import { ENV } from "config";

process.on("uncaughtException", (err) => {
  console.error(err);
  process.exit(1);
});

const server = app.listen(ENV.PORT, () => {
  console.log(`Ardatatech server running on PORT ${ENV.PORT}`);
});

process.on("unhandledRejection", (err: Error) => {
  server.close(() => {
    console.error(`FATAL ERROR: Unhandled rejection: ${err.message}`);
    process.exit(1);
  });
});
