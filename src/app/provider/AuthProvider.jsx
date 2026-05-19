import { useAuth } from "@/entities/auth/hooks/useAuth";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  const value = {
    ...auth,

    isAuthenticated: Boolean(auth.user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
