import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./auth";

// Public-only routes (login/signup) — redirect away when already logged in
const PublicRoute = () =>
  isAuthenticated() ? <Navigate to="/notes" replace /> : <Outlet />;

export default PublicRoute;
