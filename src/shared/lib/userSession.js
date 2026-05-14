const USER_SESSION = "ecocycle_user";
const USER_ROLE = "ecocycle_user_role";

export const userSession = {
  getUser: () => {
    const user = localStorage.getItem(USER_SESSION);
    const role = localStorage.getItem(USER_ROLE);

    if (!user) return role ? { role: { key: role } } : null;

    try {
      return JSON.parse(user);
    } catch {
      return role ? { role: { key: role } } : null;
    }
  },

  setUser: (user, role) => {
    if (user) localStorage.setItem(USER_SESSION, JSON.stringify(user));
    if (role) localStorage.setItem(USER_ROLE, role);
  },

  clearUser: () => {
    localStorage.removeItem(USER_SESSION);
    localStorage.removeItem(USER_ROLE);
  },
};
