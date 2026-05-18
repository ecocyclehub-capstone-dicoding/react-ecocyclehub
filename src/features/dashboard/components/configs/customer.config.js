import { MdDashboard, MdSwapHoriz, MdCardGiftcard } from "react-icons/md";

export const customerSidebar = {
  brand: "EcoCycle Hub",

  buttonText = "Logout",

  menus: [
    {
      label: "Dashboard",
      icon: MdDashboard,
      path: "/customer/dashboard",
    },
    {
      label: "Transactions",
      icon: MdSwapHoriz,
      path: "/customer/dashboard",
    },
    {
      label: "Rewards",
      icon: MdCardGiftcard,
      path: "/customer/dashboard",
    },
  ],
};
