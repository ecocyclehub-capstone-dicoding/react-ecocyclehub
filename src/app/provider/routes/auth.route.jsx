import React from "react";

import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";

import PublicRoute from "./PublicRoute";

export const authRoutes = [
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },

  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
];
