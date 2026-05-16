import { MdDashboard, MdSwapHoriz, MdEmojiEvents } from "react-icons/md";

export const officerSidebar = {
  brand: "EcoCycle Hub",

  profile: {
    name: "Resource Manager",
    role: "Platinum Curator",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },

  buttonText: "Request Pickup",

  menus: [
    {
      label: "Dashboard",
      icon: MdDashboard,
      path: "/officer/dashboard",
    },
    {
      label: "Transactions",
      icon: MdSwapHoriz,
    },
    {
      label: "Badges",
      icon: MdEmojiEvents,
    },
  ],
};
