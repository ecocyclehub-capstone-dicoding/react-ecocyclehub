import {
  MdDashboard,
  MdSwapHoriz,
  MdCategory,
  MdEmojiEvents,
} from "react-icons/md";

export const officerSidebar = {
  brand: "EcoCycle Hub",

  buttonText: "Logout",

  menus: [
    {
      label: "Dashboard",
      icon: MdDashboard,
      path: "/officer/dashboard",
      permission: "view_officer_dashboard",
    },
    {
      label: "Kelola Transaksi",
      icon: MdSwapHoriz,
      path: "/officer/transactions",
      permission: "view_all_transaction",
    },
    {
      label: "Kategori Sampah",
      icon: MdCategory,
      path: "/officer/categories",
      permission: "view_categories",
    },
    {
      label: "Papan Peringkat",
      icon: MdEmojiEvents,
      path: "/officer/leaderboard",
      permission: "view_leaderboard",
    },
  ],
};
