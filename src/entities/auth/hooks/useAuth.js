import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus digunakan di dalam <AuthProvider>");
  return ctx;
};

export default useAuth;
