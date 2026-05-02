import { Link } from "react-router-dom";
import { MdRecycling } from "react-icons/md";

const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f5f0e0]">
    <MdRecycling size={48} className="text-green-700" />
    <h1 className="text-2xl font-bold text-gray-800">
      404 — Halaman tidak ditemukan
    </h1>
    <Link
      to="/login"
      className="text-sm font-semibold text-green-700 hover:underline"
    >
      Kembali ke Login
    </Link>
  </div>
);

export default NotFoundPage;
