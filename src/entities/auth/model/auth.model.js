// ── Action types ──────────────────────────────────────────────────────────
export const AUTH_ACTIONS = {
  SET_USER: "SET_USER",
  CLEAR_USER: "CLEAR_USER",
  SET_LOADING: "SET_LOADING",
};

// ── Initial state ─────────────────────────────────────────────────────────
export const initialState = {
  user: null, // { id, name, email, role: { id, name, key, permissions[] } }
  isAuthenticated: false,
  isLoading: true, // true saat pertama cek token
};

// ── Pure reducer ──────────────────────────────────────────────────────────
export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case AUTH_ACTIONS.CLEAR_USER:
      return { ...state, user: null, isAuthenticated: false, isLoading: false };

    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};
