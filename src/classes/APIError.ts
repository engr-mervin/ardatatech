export class APIError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(statusCode: number = 500, message: string) {
    super(message);
    this.statusCode = statusCode;

    if (String(statusCode).startsWith("4")) {
      this.status = "fail";
      console.warn(message);
    } else {
      this.status = "error";
      console.error(message);
    }

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
