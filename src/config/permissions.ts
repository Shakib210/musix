export const PERMISSIONS = {
  VIEW_DASHBOARD: "VIEW_DASHBOARD",
  CREATE_USER: "CREATE_USER",
  ALL_USER: "ALL_USER",
  EDIT_USER: "EDIT_USER",
  DELETE_USER: "DELETE_USER",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
