import { useNavigate } from "react-router-dom";
import HeroPanel from "@/features/auth/components/HeroPanel";
import AuthLayout from "@/shared/layouts/AuthLayout";
import RegisterForm from "@/features/auth/components/RegisterForm";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = (data) => {
    console.log("register:", data);

    setTimeout(() => {
      alert("Register berhasil");
      navigate("/login", {
        state: { successMessage: "Account berhasil dibuat" },
      });
    }, 1000);
  };

  return (
    <AuthLayout left={<HeroPanel />}>
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
