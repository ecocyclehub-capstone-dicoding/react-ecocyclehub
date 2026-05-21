import { Navigate } from "react-router-dom";
import {
  getDashboardPathByRole,
  normalizeRole,
} from "@/entities/auth/lib/roleRedirect";

import { useAuthContext } from "@/app/provider/AuthContext";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthContext();

  if (isAuthenticated) {
    const role = normalizeRole(user?.role?.key ?? user?.role);
    const dashboardPath = getDashboardPathByRole(role);
    return <Navigate to={dashboardPath ?? "/"} replace />;
  }

  return children;
};

export default PublicRoute;
