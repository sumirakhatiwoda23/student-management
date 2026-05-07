import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import EditStudent from "../pages/EditStudent";
import AuthPage from "../pages/AuthPage";
import LandingPage from "../pages/LandingPage";
import CoursesPage from "../pages/CoursesPage";
import StudentsPage from "../pages/StudentsPage";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
      <Route path="/students" element={<ProtectedRoute><StudentsPage /></ProtectedRoute>} />
      <Route path="/edit/:id" element={<ProtectedRoute><EditStudent /></ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;