import {
  Link,
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import {
  MdArrowBack,
  MdDashboard,
  MdHome,
  MdRecycling,
  MdSearchOff,
} from "react-icons/md";
import { useAuthContext } from "@/app/provider/AuthContext";
import { getDashboardPathByRole } from "@/entities/auth/lib/roleRedirect";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const routeError = useRouteError();
  const { user } = useAuthContext();
  const role = typeof user?.role === "object" ? user?.role?.key : user?.role;
  const dashboardPath = getDashboardPathByRole(role) || "/login";
  const isNotFound =
    !routeError ||
    (isRouteErrorResponse(routeError) && routeError.status === 404);
  const title = isNotFound ? "404" : "Oops";
  const badge = isNotFound ? "Halaman tidak ditemukan" : "Terjadi kesalahan";
  const heading = isNotFound
    ? "Rute ini tidak ada di sistem."
    : "Aplikasi tidak bisa membuka halaman ini.";
  const description = isNotFound
    ? "Link yang kamu buka mungkin salah, sudah berubah, atau tidak punya akses untuk role saat ini. Gunakan tombol di bawah untuk kembali ke halaman yang aman."
    : "Ada error saat memuat halaman. Kamu bisa kembali ke dashboard atau mencoba halaman sebelumnya.";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f5f0e0] px-6 py-12 text-[#173c28]">
      <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-[#1d9e75]/10" />
      <div className="absolute bottom-[-160px] right-[-120px] h-96 w-96 rounded-full bg-[#97c459]/20" />

      <section className="relative grid w-full max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="hidden lg:block">
          <div className="relative mx-auto h-80 w-80 rounded-[2rem] border border-[#5dcaa5]/30 bg-[#0f2419] p-8 shadow-2xl shadow-[#0f2419]/20">
            <div className="absolute right-8 top-8 rounded-2xl bg-[#1d9e75] p-4 text-white">
              <MdRecycling size={36} />
            </div>

            <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/10 bg-white/10 p-5 text-white">
              <p className="text-sm font-semibold text-[#9fe1cb]">Lost route</p>
              <h2 className="mt-2 text-6xl font-black tracking-normal">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Halaman ini belum tersedia atau sudah dipindahkan dari jalur
                EcoCycle Hub.
              </p>
            </div>

            <div className="absolute left-10 top-12 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf3de] text-[#3b6d11]">
              <MdSearchOff size={32} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#ded6ad] bg-white/80 p-8 shadow-xl shadow-[#0f2419]/10 backdrop-blur sm:p-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#97c459] bg-[#eaf3de] px-4 py-2 text-sm font-semibold text-[#3b6d11]">
            <MdSearchOff size={18} />
            {badge}
          </div>

          <h1 className="text-5xl font-black tracking-normal text-[#0d4f2c] sm:text-7xl">
            {title}
          </h1>

          <h2 className="mt-4 text-2xl font-bold text-[#173c28] sm:text-3xl">
            {heading}
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-gray-600">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to={dashboardPath}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#14532d] px-6 py-3 font-semibold text-white transition hover:bg-[#0f3d22]"
            >
              <MdDashboard size={20} />
              Ke Dashboard
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#ded6ad] bg-[#f5f0e0] px-6 py-3 font-semibold text-[#173c28] transition hover:bg-[#efe8bc]"
            >
              <MdArrowBack size={20} />
              Kembali
            </button>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              <MdHome size={20} />
              Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
