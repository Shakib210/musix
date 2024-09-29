// src/middlewares/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import AppError from './AppError'; // Import the custom error class

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): Response => {
  console.error('Error:', err); // Log the error for debugging

  if (err instanceof AppError) {
    // Handle known operational errors
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Handle unknown errors
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
  });
};

export default errorHandler;
