import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  const role = localStorage.getItem("role");

  if (role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (role === "officer") {
    return <Navigate to="/officer/dashboard" replace />;
  }

  return <Navigate to="/customer/dashboard" replace />;
};

export default DashboardPage;
