import {
  MdDashboard,
  MdPeople,
  MdSwapHoriz,
  MdCategory,
  MdAssessment,
} from "react-icons/md";

export const adminSidebar = {
  brand: "EcoCycle Hub",

  profile: {
    name: "Admin Dashboard",
    role: "Manager",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },

  buttonText: "Generate Report",

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
      label: "Customers",
      icon: MdPeople,
      path: "/admin/customers",
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
