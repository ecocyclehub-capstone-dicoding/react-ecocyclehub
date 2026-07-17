import {
  MdDashboard,
  MdPeople,
  MdSwapHoriz,
  MdCategory,
  MdAssessment,
  MdEmojiEvents,
} from "react-icons/md";

export const adminSidebar = {
  brand: "EcoCycle Hub",

  buttonText: "Logout",

  menus: [
    {
      label: "Dashboard",
      icon: MdDashboard,
      path: "/admin/dashboard",
      permission: "view_admin_dashboard",
    },
    {
      label: "Transactions",
      icon: MdSwapHoriz,
      path: "/admin/transactions",
      permission: "view_all_transaction",
    },
    {
      label: "Users",
      icon: MdPeople,
      path: "/admin/users",
      permission: "view_user",
    },
    {
      label: "Categories",
      icon: MdCategory,
      path: "/admin/categories",
      permission: "view_categories",
    },
    {
      label: "Level Gamifikasi",
      icon: MdEmojiEvents,
      path: "/admin/levels",
      permission: "view_level",
    },
    {
      label: "Papan Peringkat",
      icon: MdEmojiEvents,
      path: "/admin/leaderboard",
      permission: "view_leaderboard",
    },
  ],
};
