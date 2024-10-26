import { Request, Response } from "express";
import {
  isUserExitService,
  createUserService,
  getUsersService,
} from "../services/userService";
import asyncHandler from "../utils/async.js";
import { NotFound } from "../utils/error.js";

/**
 *
 * @param req
 * @param res
 * @param next
 */
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body;

  const isUserExist = await isUserExitService(payload);

  console.log(isUserExist);
  if (isUserExist.length) throw new NotFound("User already exists!");

  const newUser = await createUserService(payload);

  return res
    .status(201)
    .json({ success: true, data: newUser, msg: "User create successfully!" });
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const allUsers = await getUsersService();

  if (!allUsers) throw new NotFound("Users not found");

  return res
    .status(201)
    .json({ success: true, allUsers, msg: "Users fetch successfully!" });
});
