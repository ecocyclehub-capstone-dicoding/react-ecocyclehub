import {
  MdDashboard,
  MdPeople,
  MdSwapHoriz,
  MdCategory,
  MdAssessment,
} from "react-icons/md";

export const adminSidebar = {
  brand: "EcoCycle Hub",

  buttonText: "Logout",

  menus: [
    {
      label: "Dashboard",
      icon: MdDashboard,
      path: "/admin/dashboard",
    },
    {
      label: "Transactions",
      icon: MdSwapHoriz,
      path: "/admin/transactions",
    },
    {
      label: "Users",
      icon: MdPeople,
      path: "/admin/users",
    },
    {
      label: "Categories",
      icon: MdCategory,
      path: "/admin/categories",
    },
    {
      label: "Reports",
      icon: MdAssessment,
      path: "/admin/reports",
    },
  ],
};
