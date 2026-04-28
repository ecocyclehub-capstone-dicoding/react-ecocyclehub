import { useNavigate } from "react-router-dom";
import HeroPanel from "@/features/auth/components/HeroPanel";
import AuthLayout from "@/shared/layouts/AuthLayout";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { useAuth } from "@/entities/auth/hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();

  const { register, loading, error } = useAuth();

  const handleRegister = async (data) => {
    try {
      const result = await register(data);

      console.log("SUCCESS REGISTER:", result);

      // 🔥 redirect tanpa delay
      navigate("/login", {
        state: { successMessage: "Account berhasil dibuat" },
      });
    } catch (err) {
      console.log("REGISTER ERROR");
    }
  };

  return (
    <AuthLayout left={<HeroPanel />}>
      <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />

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
