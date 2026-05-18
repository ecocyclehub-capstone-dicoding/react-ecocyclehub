import {
  MdDashboard,
  MdSwapHoriz,
  MdEmojiEvents,
  MdCategory,
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
      label: "Transactions",
      icon: MdSwapHoriz,
      path: "/officer/dashboard",
    },
    {
      label: "Badges",
      icon: MdCategory,
      path: "/officer/dashboard",
    },
  ],
};
