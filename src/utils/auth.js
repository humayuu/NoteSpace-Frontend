export const getToken = () => localStorage.getItem("token");

export const setToken = (token) => localStorage.setItem("token", token);

// Decode a JWT payload (base64url) without any external library.
const decodeToken = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    // Handle UTF-8 characters in the payload.
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch {
    return null;
  }
};

// Read the user's name straight from the JWT instead of localStorage.
export const getUserName = () => {
  const payload = decodeToken();
  return (
    payload?.name ||
    payload?.user?.name ||
    payload?.username ||
    payload?.email ||
    "User"
  );
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => !!getToken();
