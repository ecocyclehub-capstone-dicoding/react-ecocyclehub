const USER_SESSION = "ecocycle_user";
const USER_ROLE = "ecocycle_user_role";

export const userSession = {
  getUser: () => {
    try {
      const user = localStorage.getItem(USER_SESSION);

      if (!user) return null;

      return JSON.parse(user);
    } catch (err) {
      console.error("Failed to retrieve user session:", err);
      return null;
    }
  },

  getRole: () => {
    try {
      return localStorage.getItem(USER_ROLE);
    } catch (err) {
      console.error("Failed to retrieve user role:", err);
      return null;
    }
  },

  setUser: (user, role) => {
    try {
      if (user) {
        localStorage.setItem(USER_SESSION, JSON.stringify(user));
      }

      if (role) {
        localStorage.setItem(USER_ROLE, role);
      }

      return true;
    } catch (err) {
      console.error("Failed to persist user session:", err);

      try {
        localStorage.removeItem(USER_SESSION);
        localStorage.removeItem(USER_ROLE);
      } catch (rollbackErr) {
        console.error("Failed to rollback partial write:", rollbackErr);
      }

      return false;
    }
  },

  clearUser: () => {
    try {
      localStorage.removeItem(USER_SESSION);
      localStorage.removeItem(USER_ROLE);
    } catch (err) {
      console.error("Failed to clear user session:", err);
    }
  },
};
