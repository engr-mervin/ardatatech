import mongoose from "mongoose";
import { ENV } from "config";

const connectionString = ENV.MONGODB_CONNECTION_STRING.replace("<username>", ENV.MONGODB_USERNAME).replace("<password>", ENV.MONGODB_PASSWORD);

(async function () {
  try {
    await mongoose.connect(connectionString);
    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
})();

export default mongoose;
