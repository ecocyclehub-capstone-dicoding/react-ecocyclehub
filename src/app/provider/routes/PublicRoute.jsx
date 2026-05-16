import { Navigate } from "react-router-dom";

import { useAuthContext } from "@/app/provider/AuthProvider";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthContext();

  if (isAuthenticated) {
    const role = user?.role?.key;

    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (role === "officer") {
      return <Navigate to="/officer/dashboard" replace />;
    }

    if (role === "customer") {
      return <Navigate to="/customer/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
