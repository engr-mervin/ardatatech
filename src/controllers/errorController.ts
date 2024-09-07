import { NextFunction, Response, Request } from "express";
import { APIError } from "@/classes/APIError";
import { ENV } from "config";

const processMongoDBErrors = function (err: Error | APIError | any) {
  if (err.name === "CastError") {
    return new APIError(400, `The value of ${err.value} for ${err.path} is invalid`);
  }
  if (err.code === 11000) {
    const entries = Object.entries(err.keyValue);
    return new APIError(400, `The value of: ${entries[0][1]} for field:${entries[0][0]} already exists.`);
  }

  if (err.name === "ValidationError") {
    const errorMessages = Object.values(err.errors)
      .map((el: any) => el.message)
      .join(" ");
    return new APIError(400, errorMessages);
  }

  if (err.errors) {
    const errorMessages = err.errors.map((e: any) => e.message).join(" ");
    return new APIError(400, errorMessages);
  }

  return err;
};

const processJWTErrors = function (err: Error | APIError) {
  if (err.name === "JsonWebTokenError") {
    return new APIError(401, "Invalid web token");
  }

  if (err.name === "TokenExpiredError") {
    return new APIError(401, "Web token already expired");
  }

  return err;
};

const sendErrorDev = function (err: APIError, res: Response) {
  res.status(err.statusCode).json({
    error: err,
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = function (err: APIError, res: Response) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

export const errorHandler = (err: APIError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (ENV.NODE_ENV === "development") {
    sendErrorDev(err, res);
  }

  if (ENV.NODE_ENV === "production") {
    let error = processMongoDBErrors(err);
    error = processJWTErrors(error);
    sendErrorProd(error, res);
  }
};
