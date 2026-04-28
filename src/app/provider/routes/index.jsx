import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import authRoutes from "./auth.route";
import appRoutes from "./app.route";
import notFoundRoutes from "./not-found.route";

const router = createBrowserRouter([
  ...authRoutes,
  ...appRoutes,
  ...notFoundRoutes,
]);

const RoutesProvider = () => {
  return <RouterProvider router={router} />;
};

export default RoutesProvider;
