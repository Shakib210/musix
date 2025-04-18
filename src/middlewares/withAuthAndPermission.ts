import { authenticateToken } from "../middlewares/authenticate";
import { authorizePermission } from "../middlewares/authorize";
import { Permission } from "../config/permissions";

export function withAuthAndPermission(permission: Permission) {
  return [authenticateToken, authorizePermission(permission)];
}
