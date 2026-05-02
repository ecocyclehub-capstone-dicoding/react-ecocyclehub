import { Link } from "react-router-dom";
import { MdVisibility, MdVisibilityOff, MdArrowForward } from "react-icons/md";
import useRegisterForm from "./useRegisterForm";

// ── Reusable InputField (sama pola dengan LoginForm) ──────────────────────
const InputField = ({ label, id, error, rightElement, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label htmlFor={id} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
    )}
    <div className="relative">
      <input
        id={id}
        className={[
          "w-full rounded-xl border bg-[#edeade] px-4 py-3 text-sm text-gray-800",
          "placeholder:text-gray-400 outline-none transition-all duration-200",
          rightElement && "pr-11",
          error
            ? "border-red-400 focus:ring-2 focus:ring-red-100"
            : "border-transparent focus:border-green-600 focus:ring-2 focus:ring-green-100",
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      {rightElement && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {rightElement}
        </div>
      )}
    </div>
    {error && (
      <p className="flex items-center gap-1 text-xs text-red-500">
        <span>⚠</span> {error}
      </p>
    )}
  </div>
);

const EyeToggle = ({ show, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className="flex items-center text-gray-400 transition-colors hover:text-gray-600"
  >
    {show ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
  </button>
);

const SubmitButton = ({ isLoading, children }) => (
  <button
    type="submit"
    disabled={isLoading}
    className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a3d1f]
      px-4 py-3 text-sm font-semibold tracking-wide text-white transition-all
      duration-200 hover:bg-[#234d29] active:bg-[#163319]
      disabled:cursor-not-allowed disabled:opacity-50"
  >
    {isLoading ? (
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
    ) : (
      children
    )}
  </button>
);

// ── RegisterForm ──────────────────────────────────────────────────────────
const RegisterForm = () => {
  const {
    fields,
    errors,
    apiError,
    isLoading,
    showPassword,
    showConfirm,
    handleChange,
    togglePassword,
    toggleConfirm,
    handleSubmit,
  } = useRegisterForm();

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          Buat Akun Baru
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Bergabung dan mulai kelola bank sampahmu secara digital.
        </p>
      </div>

      {/* API Error */}
      {apiError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {apiError}
        </div>
      )}

      {/* Nama */}
      <InputField
        label="Nama Lengkap"
        id="name"
        name="name"
        placeholder="Budi Santoso"
        value={fields.name}
        onChange={handleChange}
        error={errors.name}
        autoComplete="name"
      />

      {/* Email */}
      <InputField
        label="Email"
        id="email"
        type="email"
        name="email"
        placeholder="nama@email.com"
        value={fields.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
      />

      {/* Password */}
      <InputField
        label="Password"
        id="password"
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Minimal 8 karakter"
        value={fields.password}
        onChange={handleChange}
        error={errors.password}
        autoComplete="new-password"
        rightElement={
          <EyeToggle show={showPassword} onToggle={togglePassword} />
        }
      />

      {/* Konfirmasi Password */}
      <InputField
        label="Konfirmasi Password"
        id="confirmPassword"
        type={showConfirm ? "text" : "password"}
        name="confirmPassword"
        placeholder="Ulangi password"
        value={fields.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        autoComplete="new-password"
        rightElement={<EyeToggle show={showConfirm} onToggle={toggleConfirm} />}
      />

      {/* Submit */}
      <SubmitButton isLoading={isLoading}>
        Daftar Sekarang <MdArrowForward size={16} />
      </SubmitButton>

      {/* Link login */}
      <p className="text-center text-sm text-gray-500">
        Sudah punya akun?{" "}
        <Link to="/login" className="font-bold text-green-700 hover:underline">
          Masuk di sini
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
