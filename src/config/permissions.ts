export const PERMISSIONS = {
    VIEW_DASHBOARD: 'view_dashboard',
    CREATE_PRODUCT: 'create_product',
    EDIT_PRODUCT: 'edit_product',
    DELETE_PRODUCT: 'delete_product',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];