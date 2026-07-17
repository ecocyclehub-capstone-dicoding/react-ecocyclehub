export const getPermissionKeys = (user) =>
  new Set((user?.role?.permissions || []).map((permission) => permission.key));

export const can = (user, permission) =>
  Boolean(permission && getPermissionKeys(user).has(permission));

export const canAny = (user, permissions = []) =>
  permissions.some((permission) => can(user, permission));
