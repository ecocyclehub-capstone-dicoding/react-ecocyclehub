import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { MdRecycling } from "react-icons/md";
import ProtectedRoute from "./ProtectedRoute";
import { authRoutes } from "./auth.route";
import { notFoundRoute } from "./not-found.route";

// Lazy load pages untuk performa lebih baik
const DashboardPage = lazy(() => import("@/pages/dashboard"));
const AdminDashboardPage = lazy(() => import("@/pages/dashboard")); // ganti saat admin page ada

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#f5f0e0]">
    <MdRecycling size={32} className="animate-spin text-green-700" />
  </div>
);

const wrap = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  // Redirect root ke login
  { path: "/", element: <Navigate to="/login" replace /> },

  // Public routes (auth)
  ...authRoutes,

  // Protected - customer
  {
    element: <ProtectedRoute allowedRoles={["customer"]} />,
    children: [{ path: "/dashboard", element: wrap(DashboardPage) }],
  },

  // Protected - admin
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [{ path: "/admin/dashboard", element: wrap(AdminDashboardPage) }],
  },

  // 404
  notFoundRoute,
]);
