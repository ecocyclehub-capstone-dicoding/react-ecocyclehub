/**
 * AuthLayout - wrapper untuk halaman auth
 * Atur background dan posisi form di kanan layar
 */
const AuthLayout = ({ children }) => (
  <div className="flex min-h-screen bg-[#f5f0e0]">{children}</div>
);

export default AuthLayout;
