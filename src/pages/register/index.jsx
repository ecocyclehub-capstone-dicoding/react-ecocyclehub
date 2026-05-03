import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/shared/layouts/AuthLayout";
import HeroPanel from "@/features/auth/components/HeroPanel";
import RegisterForm from "@/features/auth/components/RegisterForm";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = (data) => {
    console.log("register:", data);

    navigate("/login", {
      state: { successMessage: "Registrasi berhasil, silakan login." },
    });
  };

  return (
    <AuthLayout
      left={
        <HeroPanel
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuAKkDrHtoav5RkaMs7NYFNQcyvC9yuB_pprNfjelK94WTIZljkX5YfMya1jZ2WzRKjmCIw2CEXGL6QA0wLCxuGLSP6gD-cB1i85YT2mynPynurdwYhAVQfZ0_zZ52I4bYBrqDTQAbVqLo72FlbVuRFsq3pes7jY37XBAxC4OEqGYt6ixQdcOgY2xG7lLo_DiM3DG8cgbLb8Mt2vnjgEEOrUiESL7LrL5LRFR7xhG6wDG3kxB7Fnk9pGOjPGvV5eXE0sHi1Pqz3N7wZw"
          title="Cultivate a sustainable future."
          subtitle="Join our ecosystem and start making impact today."
        />
      }
    >
      <RegisterForm onSubmit={handleRegister} />

      <p className="text-sm text-center mt-6 text-gray-600">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-green-700 font-medium cursor-pointer hover:underline"
        >
          Login here
        </span>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
