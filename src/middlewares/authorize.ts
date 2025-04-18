import { Request, Response, NextFunction } from 'express';
import { Permission } from '../config/permissions';

export function authorizePermission(requiredPermission: Permission) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const userPermissions = req.user?.permissions || [];

        if (!userPermissions.includes(requiredPermission)) {
            res.status(403).json({ message: 'Forbidden: Permission denied' });
            return; // Ensure no further middleware is called
        }
        next(); // Permission is valid, proceed to the next middleware
    };
}
