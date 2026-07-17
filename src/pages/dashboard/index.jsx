import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/app/provider/AuthContext";
import { getDashboardPathByRole } from "@/entities/auth/lib/roleRedirect";

const DashboardPage = () => {
  const { user } = useAuthContext();
  const role = user?.role?.key;

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getDashboardPathByRole(role) || "/login"} replace />;
};

export default DashboardPage;
