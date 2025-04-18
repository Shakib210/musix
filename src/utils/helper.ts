import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to hash password
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Function to generate a JWT
export function generateToken(user: any) {
  const payload = { id: user.id, email: user.email, role: user.role };
  const secret = process.env.JWT_SECRET as jwt.Secret;
  const options = { expiresIn: process.env.TOKEN_EXPIRE };

  return jwt.sign(payload, secret, options);
}
