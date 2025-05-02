import { getUsersByEmailService } from "../services/userService";
import { Request, Response } from "express";
import asyncHandler from "../utils/async";
import { generateToken } from "../utils/helper";
import bcrypt from "bcrypt";

export const login = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		// Find user by email
		const user = await getUsersByEmailService(email);

		if (!user) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		// Compare passwords
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		// Generate JWT
		const token = generateToken(user);
		return res.status(200).json({ user: { ...user, password: undefined }, token });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
});
