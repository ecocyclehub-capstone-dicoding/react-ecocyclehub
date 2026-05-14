export const ROLE_DASHBOARD_PATHS = {
  admin: "/admin/dashboard",
  officer: "/officer/dashboard",
  customer: "/customer/dashboard",
};

export const normalizeRole = (role) => {
  if (!role) return null;

  if (typeof role === "string") return role.toLowerCase();

  return (role.key || role.name || role.slug || "").toLowerCase() || null;
};

export const getDashboardPathByRole = (role) => {
  const normalizedRole = normalizeRole(role);

  return ROLE_DASHBOARD_PATHS[normalizedRole] || ROLE_DASHBOARD_PATHS.customer;
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
