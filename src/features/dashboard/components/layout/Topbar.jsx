import { useAuthContext } from "@/app/provider/AuthProvider";

const Topbar = ({ title, subtitle }) => {
  const { user } = useAuthContext();
  const initial = user?.name.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="mb-8 flex items-center justify-between border-b border-[#ded6ad] pb-6">
      <div>
        <p className="mb-2 text-sm font-semibold text-[#6f7f55]">
          EcoCycle Hub
        </p>

        <h1 className="text-3xl font-bold text-[#0d4f2c] lg:text-4xl">
          {title}
        </h1>

        {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-[#173c28]">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1d9e75] font-bold text-white">
          {initial}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
