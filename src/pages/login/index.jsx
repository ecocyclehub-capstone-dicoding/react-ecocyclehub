import React from "react";
import { useLocation } from "react-router-dom";
import AuthLayout from "@/shared/layouts/AuthLayout";
import HeroPanel from "@/features/auth/components/HeroPanel";
import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage = () => {
  const location = useLocation();
  const successMessage = location.state?.successMessage;

  const handleLogin = (data) => {
    console.log("login:", data);
  };

  return (
    <AuthLayout left={<HeroPanel />}>
      {successMessage && (
        <div className="mb-4 text-green-700 text-sm">{successMessage}</div>
      )}

      <LoginForm onSubmit={handleLogin} />
    </AuthLayout>
  );
};

export default LoginPage;
