export const ROLE_DASHBOARD_PATHS = {
  admin: "/admin/dashboard",
  officer: "/officer/dashboard",
  customer: "/customer/dashboard",
};

const VALID_ROLES = ["admin", "officer", "customer"];

export const normalizeRole = (role) => {
  if (!role) return null;

  const normalized =
    typeof role === "string"
      ? role.toLowerCase()
      : (role.key || role.name || role.slug || "").toLowerCase();

  return VALID_ROLES.includes(normalized) ? normalized : null;
};

export const getDashboardPathByRole = (role) => {
  const normalizedRole = normalizeRole(role);

  return normalizedRole ? ROLE_DASHBOARD_PATHS[normalizedRole] : null;
};

export const getRoleFromLoginResponse = (response) => {
  const data = response?.data || response;

  return normalizeRole(
    data?.user?.role ||
      data?.user?.role_key ||
      data?.role ||
      data?.role_key ||
      data?.account_type,
  );
};
