import { useState } from "react";

const VerifyPasswordModal = ({ open, loading, error, onClose, onSubmit }) => {
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setPassword("");
    onClose?.();
  };

  const handleSubmit = async () => {
    if (!password.trim()) return;

    await onSubmit(password);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-[#0d4f2c]">
          Verifikasi Password
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Masukkan password akun Anda untuk memverifikasi transaksi.
        </p>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-semibold text-[#173c28]">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
              }
            }}
            placeholder="Masukkan password"
            autoComplete="current-password"
            className={`h-12 w-full rounded-2xl border px-4 text-sm outline-none transition
              ${
                error
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-200 focus:border-[#14532d]"
              }
            `}
          />

          {error && (
            <p className="mt-2 text-sm font-medium text-red-500">{error}</p>
          )}
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-2xl border border-gray-200 px-5 py-3 font-semibold text-gray-600 transition hover:bg-gray-100 disabled:opacity-50"
          >
            Batal
          </button>

          <button
            type="button"
            disabled={loading || !password.trim()}
            onClick={handleSubmit}
            className="rounded-2xl bg-[#14532d] px-5 py-3 font-semibold text-white transition hover:bg-[#0f3d22] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPasswordModal;
