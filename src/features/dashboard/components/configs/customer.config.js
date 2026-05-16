import { MdDashboard, MdSwapHoriz, MdCardGiftcard } from "react-icons/md";

export const customerSidebar = {
  brand: "EcoCycle Hub",

  profile: {
    name: "Elena",
    role: "Eco Guardian",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },

  buttonText: "Deposit Waste",

  menus: [
    {
      label: "Dashboard",
      icon: MdDashboard,
      path: "/customer/dashboard",
    },
    {
      label: "Transactions",
      icon: MdSwapHoriz,
    },
    {
      label: "Rewards",
      icon: MdCardGiftcard,
    },
  ],
};
