import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/shared/layouts/AuthLayout";
import HeroPanel from "@/features/auth/components/HeroPanel";
import LoginForm from "@/features/auth/components/LoginForm";
import { useAuth } from "@/entities/auth/hooks/useAuth";
import {
  getDashboardPathByRole,
  getRoleFromLoginResponse,
} from "@/entities/auth/lib/roleRedirect";

const LoginPage = () => {
  const navigate = useNavigate();

  const { login, loading, error, fieldErrors } = useAuth();

  const handleLogin = async (data) => {
    try {
      const res = await login(data);

      console.log("LOGIN SUCCESS:", res);

      navigate(getDashboardPathByRole(getRoleFromLoginResponse(res)), {
        replace: true,
      });
    } catch {
      return;
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
