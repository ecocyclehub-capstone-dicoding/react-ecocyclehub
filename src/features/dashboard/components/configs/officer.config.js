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
    },
    {
      label: "Kelola Transaksi",
      icon: MdSwapHoriz,
      path: "/officer/transactions",
    },
    {
      label: "Kategori Sampah",
      icon: MdCategory,
      path: "/officer/categories",
    },
    {
      label: "Papan Peringkat",
      icon: MdEmojiEvents,
      path: "/officer/leaderboard",
    },
  ],
};
