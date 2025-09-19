import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function EditProject() {
  const { id } = useParams();
  const [project, setProject] = useState({ name: "", description: "" });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProject(res.data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
      }
    };
    fetchProject();
  }, [id, user.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/projects/${id}`, project, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to update project:", err);
    }
  };

  return (
    <div className="edit-page card">
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Project Name:</label>
          <input type="text" name="name" value={project.name} onChange={handleChange} placeholder="Enter project name" required/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea name="description" value={project.description} onChange={handleChange} placeholder="Enter project description" required/>
        </div>
        <button type="submit" className="primary">Save Changes</button>
      </form>
    </div>
  );
}
