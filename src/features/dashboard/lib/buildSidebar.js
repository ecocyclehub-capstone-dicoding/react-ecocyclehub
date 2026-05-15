export const buildSidebar = (config, user) => {
  return {
    ...config,

    profile: {
      name: user?.name || "User",

      role: user?.role?.name || user?.role || "Member",
    },
  };
};
