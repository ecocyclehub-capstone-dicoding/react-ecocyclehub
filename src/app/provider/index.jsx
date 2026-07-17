import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import { AuthProvider } from "@/app/provider/AuthProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/queryClient";

const AppProvider = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>
);

export default AppProvider;
