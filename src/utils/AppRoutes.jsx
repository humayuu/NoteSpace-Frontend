import { Route, Routes } from "react-router-dom";
import Welcome from "../Welcome";
import Signup from "../Signup";
import Login from "../Login";
import Notes from "../notes/Notes";
import Create from "../notes/Create";
import Edit from "../notes/Edit";
import NotFound from "../NotFound";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Welcome />} />

      {/* Public-only (redirect to /notes when logged in) */}
      <Route element={<PublicRoute />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Private (require auth) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/create" element={<Create />} />
        <Route path="/notes/:id/edit" element={<Edit />} />
      </Route>

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
