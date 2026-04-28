import React from "react";
import LoginPage from "../../../pages/login";
import RegisterPage from "../../../pages/register";

const authRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];

export default authRoutes;
