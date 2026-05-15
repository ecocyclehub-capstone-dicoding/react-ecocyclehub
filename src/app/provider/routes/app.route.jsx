import React, { lazy, Suspense } from "react";
import { MdRecycling } from "react-icons/md";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { authRoutes } from "./auth.route";
import { notFoundRoutes } from "./not-found.route";
import ProtectedRoute from "./ProtectedRoute";

const DashboardRedirectPage = lazy(() => import("@/pages/dashboard"));
const AdminDashboardPage = lazy(() => import("@/pages/dashboard/admin"));
const OfficerDashboardPage = lazy(() => import("@/pages/dashboard/officer"));
const CustomerDashboardPage = lazy(() => import("@/pages/dashboard/customer"));

const AdminUsersPage = lazy(() => import("@/pages/dashboard/admin/users"));

const AdminTransactionsPage = lazy(
  () => import("@/pages/dashboard/admin/transactions"),
);

const AdminCategoriesPage = lazy(
  () => import("@/pages/dashboard/admin/categories"),
);

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#f5f0e0]">
    <MdRecycling size={40} className="animate-spin text-green-700" />
  </div>
);

const wrap = (Component) => (
  <Suspense fallback={<PageLoader />}>
    {React.createElement(Component)}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  ...authRoutes,

  /*
   |--------------------------------------------------------------------------
   | DASHBOARD REDIRECT
   |--------------------------------------------------------------------------
   */

  {
    path: "/dashboard",
    element: <ProtectedRoute allowedRoles={["admin", "officer", "customer"]} />,

    children: [
      {
        index: true,
        element: wrap(DashboardRedirectPage),
      },
    ],
  },

  /*
   |--------------------------------------------------------------------------
   | ADMIN
   |--------------------------------------------------------------------------
   */

  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: wrap(AdminDashboardPage),
      },

      {
        path: "users",
        element: wrap(AdminUsersPage),
      },
      {
        path: "transactions",
        element: wrap(AdminTransactionsPage),
      },
      {
        path: "categories",
        element: wrap(AdminCategoriesPage),
      },
    ],
  },

  /*
   |--------------------------------------------------------------------------
   | OFFICER
   |--------------------------------------------------------------------------
   */

  {
    path: "/officer",
    element: <ProtectedRoute allowedRoles={["officer"]} />,

    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: wrap(OfficerDashboardPage),
      },
    ],
  },

  /*
   |--------------------------------------------------------------------------
   | CUSTOMER
   |--------------------------------------------------------------------------
   */

  {
    path: "/customer",
    element: <ProtectedRoute allowedRoles={["customer"]} />,

    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: wrap(CustomerDashboardPage),
      },
    ],
  },

  notFoundRoutes,
]);
