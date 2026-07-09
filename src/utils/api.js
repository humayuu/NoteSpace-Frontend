import axios from "axios";

const api = axios.create({
  baseURL: "https://notespace-backend-production.up.railway.app/api",
  headers: { "Content-Type": "application/json" },
});

// Attach the auth token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On an expired/invalid session, clear it and send the user to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }
    return Promise.reject(error);
  },
);

export default api;
