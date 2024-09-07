import { AccountType } from "./accountTypes";

declare module "express-serve-static-core" {
  interface Request {
    account?: AccountType;
  }
}
