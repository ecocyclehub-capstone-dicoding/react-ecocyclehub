import React, { lazy, Suspense } from "react";
import { MdRecycling } from "react-icons/md";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { authRoutes } from "./auth.route";
// import ProtectedRoute from "./ProtectedRoute";
import { notFoundRoutes } from "./not-found.route";

const DashboardPage = lazy(() => import("@/pages/dashboard"));
const AdminDashboardPage = lazy(() => import("@/pages/dashboard"));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#f5f0e0]">
    <MdRecycling size={13} className="animate-spin text-green-700" />
  </div>
);

const wrap = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },

  ...authRoutes,

  //   {
  //     element: <ProtectedRoute allowedRoles={["customer"]}/>,
  //     children=[{ path: "/dashboard", element: wrap(DashboardPage) }],
  //   },

  //   {
  //     element: <ProtectedRoute allowedRoles={["admin"]}/>,
  //     children=[{ path: "/admin/dashboard", element: wrap(AdminDashboardPage) }],
  //   },

  notFoundRoutes,
]);
