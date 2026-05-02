import { Link } from "react-router-dom";
import { MdVisibility, MdVisibilityOff, MdArrowForward } from "react-icons/md";
import useLoginForm from "./useLoginForm";

// ── Reusable sub-components ───────────────────────────────────────────────

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

// ── LoginForm ─────────────────────────────────────────────────────────────
const LoginForm = () => {
  const {
    fields,
    errors,
    apiError,
    isLoading,
    showPassword,
    handleChange,
    togglePassword,
    handleSubmit,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Welcome Back</h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter your credentials to access the hub.
        </p>
      </div>

      {/* API Error */}
      {apiError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {apiError}
        </div>
      )}

      {/* Email */}
      <InputField
        label="Email Address"
        id="email"
        type="email"
        name="email"
        placeholder="name@company.com"
        value={fields.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
      />

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-gray-700"
          >
            Password
          </label>
          <button
            type="button"
            className="text-xs font-bold text-green-700 hover:underline"
          >
            Forgot?
          </button>
        </div>
        <InputField
          id="password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="••••••••"
          value={fields.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
          rightElement={
            <button
              type="button"
              onClick={togglePassword}
              className="flex items-center text-gray-400 transition-colors hover:text-gray-600"
              aria-label={
                showPassword ? "Sembunyikan password" : "Tampilkan password"
              }
            >
              {showPassword ? (
                <MdVisibilityOff size={18} />
              ) : (
                <MdVisibility size={18} />
              )}
            </button>
          }
        />
      </div>

      {/* Submit */}
      <SubmitButton isLoading={isLoading}>
        Sign In to Hub <MdArrowForward size={16} />
      </SubmitButton>

      {/* Link register */}
      <p className="text-center text-sm text-gray-500">
        New to the platform?{" "}
        <Link
          to="/register"
          className="font-bold text-green-700 hover:underline"
        >
          Create an Account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
