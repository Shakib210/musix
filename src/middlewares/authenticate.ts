import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: number;
    email: string;
    permissions: string[];
}

declare global {
    namespace Express {
        interface Request {
            user?: { id: number; email: string; permissions: string[] };
        }
    }
}

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return; // Ensure the function does not proceed
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Invalid token' });
            return; // Ensure the function does not proceed
        }
        req.user = user as JwtPayload;
        next(); // Pass control to the next middleware
    });
}
