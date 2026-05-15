import React from "react";
import { MdRecycling } from "react-icons/md";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/entities/auth/hooks/useAuth";
import {
  getDashboardPathByRole,
  normalizeRole,
} from "@/entities/auth/lib/roleRedirect";

const Spinner = () => (
  <div
    className="flex min-h-screen items-center justify-center bg-[#f5f0e0]"
    role="status"
    aria-live="polite"
  >
    <MdRecycling
      size={36}
      className="animate-spin text-green-700"
      aria-hidden="true"
    />

    <span className="sr-only">Loading</span>
  </div>
);

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <Spinner />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const role = normalizeRole(user?.role);

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(role)) {
    const dashboardPath = getDashboardPathByRole(role);

    if (!dashboardPath) {
      return <Navigate to="/login" replace />;
    }

    return <Navigate to={dashboardPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
