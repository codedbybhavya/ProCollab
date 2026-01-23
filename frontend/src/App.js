import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectsPage from "./pages/ProjectsPage";

import DashboardLayout from "./pages/dashboard/DashboardLayout";
import MyProjects from "./pages/dashboard/MyProjects";
import Applications from "./pages/dashboard/Applications";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />

        {/* PROTECTED DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="my-projects" element={<MyProjects />} />
          <Route path="applications" element={<Applications />} />
        </Route>

        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
