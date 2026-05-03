import React from "react";
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
    <AuthLayout
      left={
        <HeroPanel
          image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80"
          title="Turning today's waste into tomorrow's resource."
          subtitle="Access your account and continue your impact journey."
        />
      }
    >
      {successMessage && (
        <div className="mb-4 text-green-700 text-sm">{successMessage}</div>
      )}

      <LoginForm onSubmit={handleLogin} />

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
