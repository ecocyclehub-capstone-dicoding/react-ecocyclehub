import { useNavigate } from "react-router-dom";
import AuthLayout from "@/shared/layouts/AuthLayout";
import HeroPanel from "@/features/auth/components/HeroPanel";
import LoginForm from "@/features/auth/components/LoginForm";
import { useAuthContext } from "@/app/provider/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();

  const { login, loading, error, fieldErrors } = useAuthContext();

  const handleLogin = async (data) => {
    try {
      const { dashboardPath } = await login(data);

      if (!dashboardPath) {
        throw new Error("Invalid dashboard path");
      }

      navigate(dashboardPath, {
        replace: true,
      });
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <AuthLayout
      left={
        <HeroPanel
          image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80"
          title="Turning today's waste into tomorrow's resource."
          subtitle="Access your account and continue your impact journey."
        />
      }
    >
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        error={error}
        fieldErrors={fieldErrors}
      />

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
