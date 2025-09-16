import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  // Navigate to edit page or open modal
  console.log("Update project", projectId);
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
        <div className="p-6 dashboard">
            <h2 className="text-2xl mb-4">My Projects</h2>
            <div className="projects-container">
            {
                projects.map((project) => (
                
                // <div key={project._id} className="border p-3 mb-2">
                //     <Link to={`/projects/${project._id}`}>{project.name}</Link>
                // </div>
                <div key={project._id} className="project-card1">
  <div className="project-header">
    <Link to={`/projects/${project._id}`} className="project-link">
      {project.name}
    </Link>
    <div className="project-actions">
      <button onClick={() => handleUpdate(project._id)}>Update</button>
      <button onClick={() => handleDelete(project._id)}>Delete</button>
    </div>
  </div>
</div>
                
                ))
            } 
            </div>
            <br></br>
            <h4><Link to={`/projects`}>Add New Project</Link></h4>

        </div>
    );
}
