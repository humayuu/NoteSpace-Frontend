export const getToken = () => localStorage.getItem("token");

export const setToken = (token) => localStorage.setItem("token", token);

export const getUserName = () => localStorage.getItem("name") || "User";

export const setUser = (user) => {
  if (user?.name) localStorage.setItem("name", user.name);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
};

export const isAuthenticated = () => !!getToken();
