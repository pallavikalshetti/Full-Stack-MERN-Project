import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await api.get("/api/projects", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProjects(res.data);
    };
    fetchProjects();
  }, [user]);

  const handleUpdate = (projectId) => {
    navigate(`/projects/edit/${projectId}`);
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProjects(projects.filter((p) => p._id !== projectId));
    } catch (err) {
      console.error("Error deleting project", err);
    }
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">My Projects</h2>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="project-table-wrapper">
          <table className="project-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
           <tbody>
  {projects.map((project) => (
    <tr key={project._id}>
      <td data-label="Name">
        <Link to={`/projects/${project._id}`} className="project-name-link">
          {project.name}
        </Link>
      </td>
      <td data-label="Description">{project.description}</td>
      <td data-label="Actions">
        <div className="action-buttons">
          <button
            className="action-button update"
            onClick={() => handleUpdate(project._id)}
          >
            Update
          </button>
          <button
            className="action-button delete"
            onClick={() => handleDelete(project._id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

          
          </table>
        </div>
      )}

      <div className="add-project-link">
        <Link to="/projects" className="primary">+ Add New Project</Link>
      </div>
    </div>
  );
}
