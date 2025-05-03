import jwt from "jsonwebtoken";
import { getUserPermissions } from "../services/userService";

interface JwtPayload {
	id: number;
	email: string;
	permissions: string[];
}

export async function generateToken(user: { id: number; email: string }) {
	const userPermissions = await getUserPermissions(user.id);

	const payload: JwtPayload = {
		id: user.id,
		email: user.email,
		permissions: userPermissions,
	};

	return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
}
