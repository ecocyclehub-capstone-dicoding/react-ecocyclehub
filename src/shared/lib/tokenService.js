const KEYS = {
  ACCESS: "access_token",
  REFRESH: "refresh_token",
};

const tokenService = {
  getAccess: () => localStorage.getItem(KEYS.ACCESS),
  getRefresh: () => localStorage.getItem(KEYS.REFRESH),

  setTokens: (access, refresh) => {
    localStorage.setItem(KEYS.ACCESS, access);
    if (refresh) localStorage.setItem(KEYS.REFRESH, refresh);
  },

  clearTokens: () => {
    localStorage.removeItem(KEYS.ACCESS);
    localStorage.removeItem(KEYS.REFRESH);
  },
};

export default tokenService;
