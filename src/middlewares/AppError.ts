class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  originalError?: Error;

  constructor(message: string, statusCode: number, originalError?: Error) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.originalError = originalError;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
