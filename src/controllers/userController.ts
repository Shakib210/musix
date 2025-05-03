import { Request, Response } from "express";
import {
	isUserExitService,
	createUserService,
	getUsersService,
	getUserByEmailService,
	userUpdateService,
	deleteUserService,
} from "../services/userService";
import asyncHandler from "../utils/async.js";
import { NotFound } from "../utils/error.js";
import { hashPassword } from "../utils/helper";
import validateUser from "../validation/signupValidation.js";

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

export const getUserByEmail = asyncHandler(async (req: Request, res: Response) => {
	const email = req.params.email;

	const allUsers = await getUserByEmailService(email);

	if (!allUsers) throw new NotFound("User not found");

	return res.status(201).json({ success: true, allUsers, msg: "Users fetch successfully!" });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
	const email = req.params.email;
	const payload = req.body;

	const user = await getUserByEmailService(email);

	if (!user) throw new NotFound("User not found");

	// Validate the payload
	const { error, value } = validateUser(payload, true);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	const updatedUser = await userUpdateService(user.id, value);

	return res.status(201).json({ success: true, updatedUser, msg: "Users fetch successfully!" });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
	const email = req.params.email;

	const user = await getUserByEmailService(email);

	if (!user) throw new NotFound("User not found");

	const updatedUser = await deleteUserService(user.id);

	return res.status(201).json({ success: true, updatedUser, msg: "Users fetch successfully!" });
});
