import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import { AuthProvider } from "@/entities/auth/provider/AuthProvider";

const AppProvider = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default AppProvider;
