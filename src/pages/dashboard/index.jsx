import { useNavigate } from "react-router-dom";
import { MdRecycling } from "react-icons/md";
import useAuth from "@/entities/auth/hooks/useAuth";
import { authApi } from "@/entities/auth/api/auth.api";

const DashboardPage = () => {
  const { user, clearUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authApi.logout();
    clearUser();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f5f0e0]">
      <MdRecycling size={48} className="text-green-700" />
      <h1 className="text-xl font-bold text-gray-800">
        Selamat datang, {user?.name ?? "Nasabah"}!
      </h1>
      <p className="text-sm text-gray-500">
        Role: <strong>{user?.role?.name ?? "-"}</strong>
      </p>
      <button
        onClick={handleLogout}
        className="mt-2 text-sm font-semibold text-red-500 hover:underline"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
