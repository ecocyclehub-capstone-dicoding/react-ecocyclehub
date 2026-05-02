import { useLocation } from "react-router-dom";
import { MdRecycling } from "react-icons/md";
import AuthLayout from "@/shared/layouts/AuthLayout";
import HeroPanel from "@/features/auth/components/HeroPanel";
import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage = () => {
  const location = useLocation();
  const successMessage = location.state?.successMessage;

  return (
    <AuthLayout>
      {/* Hero kiri */}
      <HeroPanel />

      {/* Form kanan */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[400px]">
          {/* Logo — hanya tampil di mobile */}
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-700">
              <MdRecycling size={20} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-800">
              EcoCycle Hub
            </span>
          </div>

          {/* Success toast dari register */}
          {successMessage && (
            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {successMessage}
            </div>
          )}

          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
