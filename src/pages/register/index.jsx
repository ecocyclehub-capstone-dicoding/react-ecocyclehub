import { MdRecycling } from "react-icons/md";
import AuthLayout from "@/shared/layouts/AuthLayout";
import HeroPanel from "@/features/auth/components/HeroPanel";
import RegisterForm from "@/features/auth/components/RegisterForm";

const RegisterPage = () => (
  <AuthLayout>
    {/* Hero kiri — beda foto dan teks */}
    <HeroPanel
      imageUrl="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=1200&q=80"
      title="Bergabunglah bersama ribuan nasabah bank sampah digital."
      subtitle="Daftarkan diri dan mulai berkontribusi untuk Indonesia yang lebih bersih dan lestari."
      widthClass="lg:w-[45%]"
      showBadges={false}
    />

    {/* Form kanan */}
    <div className="flex flex-1 items-center justify-center px-6 py-12">
      <div className="w-full max-w-[400px]">
        {/* Logo mobile */}
        <div className="mb-8 flex items-center gap-2.5 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-700">
            <MdRecycling size={20} className="text-white" />
          </div>
          <span className="text-lg font-bold text-gray-800">EcoCycle Hub</span>
        </div>

        <RegisterForm />
      </div>
    </div>
  </AuthLayout>
);

export default RegisterPage;
