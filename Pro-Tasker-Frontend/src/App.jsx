import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import AddProject from "./pages/AddProject";
import AddTask from "./pages/AddTask";

import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
return (
<>
<Navbar />
<div className="app">
<Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
    <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
    <Route path="/projects" element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
    <Route path="/projects/:id/tasks" element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
</Routes>
</div>
</>
);
}