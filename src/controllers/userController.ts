import { Request, Response } from "express";
import { isUserExitService, createUserService, getUsersService } from "../services/userService";
import asyncHandler from "../utils/async.js";
import { NotFound } from "../utils/error.js";
import { hashPassword } from "../utils/helper";

/**
 *
 * @param req
 * @param res
 * @param next
 */
export const createUser = asyncHandler(async (req: Request, res: Response) => {
	const payload = req.body;

	const isUserExist = await isUserExitService(payload);

	if (isUserExist.length) throw new NotFound("User already exists!");

	const hashedPassword = await hashPassword(payload.password);
	payload.password = hashedPassword;

	const newUser = await createUserService(payload);

	return res.status(201).json({
		success: true,
		data: { ...newUser, password: undefined },
		msg: "User create successfully!",
	});
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
	const allUsers = await getUsersService();

	if (!allUsers) throw new NotFound("Users not found");

	return res.status(201).json({ success: true, allUsers, msg: "Users fetch successfully!" });
});
