export const buildSidebar = (config, user) => {
  const role = typeof user?.role === "object" ? user?.role?.key : user?.role;

  return {
    ...config,

    profile: {
      name: user?.email || "User",
      role: role || "Member",
    },
  };
};
