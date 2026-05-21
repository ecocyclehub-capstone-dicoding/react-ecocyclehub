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
    },
    {
      label: "Riwayat Transaksi",
      icon: MdSwapHoriz,
      path: "/customer/transactions",
    },
    {
      label: "Katalog Sampah",
      icon: MdInventory2,
      path: "/customer/categories",
    },
    {
      label: "Papan Peringkat",
      icon: MdEmojiEvents,
      path: "/customer/leaderboard",
    },
  ],
};
