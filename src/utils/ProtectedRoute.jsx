import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./auth";

// Private routes — only reachable when logged in
const ProtectedRoute = () =>
  isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;

export default ProtectedRoute;
