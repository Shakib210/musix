import { Request, Response, NextFunction } from "express";
import { prisma } from "@config/db"; // Adjust the path to your Prisma client
import AppError from "@middlewares/AppError"; // Import the custom error class

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await prisma.user.findMany();

    if (!users.length) {
      return next(new AppError("No users found", 404)); // Specific error if no users
    }

    res.status(200).json(users);
  } catch (error) {
    next(new AppError("Error fetching users", 500)); // Catch any other errors
  }
};

/**
 *
 * @param req
 * @param res
 */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      userAccount,
      email,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      phoneNumber,
    } = req.body;

    const newUser = await prisma.user.create({
      data: {
        userAccount,
        email,
        firstName,
        lastName,
        gender,
        dateOfBirth: new Date(dateOfBirth),
        phoneNumber,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(new AppError("Failed to create user", 500)); // Use AppError to throw a specific error
  }
};
