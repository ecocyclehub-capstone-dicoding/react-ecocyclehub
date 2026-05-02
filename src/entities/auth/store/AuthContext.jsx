import { createContext, useReducer, useEffect } from "react";
import { authReducer, initialState, AUTH_ACTIONS } from "../model/auth.model";
import { authApi } from "../api/auth.api";
import tokenService from "@/shared/lib/tokenService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore session saat app pertama kali dibuka
  useEffect(() => {
    const restoreSession = async () => {
      if (!tokenService.getAccess()) {
        dispatch({ type: AUTH_ACTIONS.CLEAR_USER });
        return;
      }
      try {
        const user = await authApi.getMe();
        dispatch({ type: AUTH_ACTIONS.SET_USER, payload: user });
      } catch {
        tokenService.clearTokens();
        dispatch({ type: AUTH_ACTIONS.CLEAR_USER });
      }
    };
    restoreSession();
  }, []);

  // Actions yang diekspos ke consumer
  const setUser = (user) =>
    dispatch({ type: AUTH_ACTIONS.SET_USER, payload: user });
  const clearUser = () => dispatch({ type: AUTH_ACTIONS.CLEAR_USER });

  return (
    <AuthContext.Provider value={{ ...state, setUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};
