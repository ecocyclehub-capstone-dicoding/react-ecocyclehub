export const buildSidebar = (config, user) => {
  const role = typeof user?.role === "object" ? user?.role?.key : user?.role;

  return {
    ...config,

    menus: (config.menus || []).filter(
      (menu) => !menu.permission || can(user, menu.permission),
    ),
    profile: {
      name: user?.name || "User",

      role: role?.charAt(0).toUpperCase() + role?.slice(1) || "Member",
    },
  };
};
import { can } from "@/shared/lib/permissions";
