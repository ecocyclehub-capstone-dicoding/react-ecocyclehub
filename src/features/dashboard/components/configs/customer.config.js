import {
  MdDashboard,
  MdEmojiEvents,
  MdInventory2,
  MdSwapHoriz,
} from "react-icons/md";

export const customerSidebar = {
  brand: "EcoCycle Hub",

  buttonText: "Logout",

  menus: [
    {
      label: "Dashboard",
      icon: MdDashboard,
      path: "/customer/dashboard",
      permission: "view_customer_dashboard",
    },
    {
      label: "Riwayat Transaksi",
      icon: MdSwapHoriz,
      path: "/customer/transactions",
      permission: "view_transaction",
    },
    {
      label: "Katalog Sampah",
      icon: MdInventory2,
      path: "/customer/categories",
      permission: "view_categories",
    },
    {
      label: "Papan Peringkat",
      icon: MdEmojiEvents,
      path: "/customer/leaderboard",
      permission: "view_leaderboard",
    },
  ],
};
