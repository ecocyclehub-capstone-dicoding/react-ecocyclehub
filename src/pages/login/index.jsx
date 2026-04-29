import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "@/shared/layouts/AuthLayout";
import HeroPanel from "@/features/auth/components/HeroPanel";
import LoginForm from "@/features/auth/components/LoginForm";
import { useAuth } from "@/entities/auth/hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const successMessage = location.state?.successMessage;
  const { login, loading, error } = useAuth();

  const handleLogin = async (data) => {
    try {
      const result = await login(data);

      console.log("SUCCESS LOGIN:", result);

      // 🔥 redirect setelah login
      navigate("/dashboard");
    } catch (err) {
      console.log("LOGIN ERROR");
    }
  };

  return (
    <AuthLayout left={<HeroPanel />}>
      {successMessage && (
        <div className="mb-4 text-green-700 text-sm">{successMessage}</div>
      )}

      <LoginForm onSubmit={handleLogin} loading={loading} error={error} />

      <p className="text-sm text-center mt-6 text-gray-600">
        New to the platform?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-green-700 font-medium cursor-pointer hover:underline"
        >
          Create An Account
        </span>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
