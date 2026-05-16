export const buildSidebar = (config, user) => {
  const role = typeof user?.role === "object" ? user?.role?.key : user?.role;
  console.log(user);

  return {
    ...config,

    profile: {
      name: user?.name || "User",

      role: role?.charAt(0).toUpperCase() + role?.slice(1) || "Member",
    },
  };
};
