import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";


export default function ProjectDetails() {
const { id } = useParams();
const { user } = useAuth();
const [project, setProject] = useState(null);
const [tasks, setTasks] = useState([]);


 // Fetch project details
useEffect(() => {
    const fetchProject = async () => {
        try {
    const res = await api.get(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
    });
    setProject(res.data);
    } catch (err) {
        console.error("Failed to fetch project:", err);
        setError("Project not found or you are not authorized");
      }
    };
    fetchProject();
}, [id, user]);

useEffect(() => {
    const fetchTask = async () => {
        try {
    const res1 = await api.get(`/api/tasks/project/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
    });
    setTasks(res1.data);
    } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    }
    fetchTask();
}, [id, user]);

 // Update project
  const handleUpdateProject = () => {
    navigate(`/projects/${id}/edit`);
  };

   // Delete project
  const handleDeleteProject = async () => {
    const confirm = window.confirm("Are you sure you want to delete this project?");
    if (!confirm) return;

    try {
      await api.delete(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert("Project deleted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to delete project:", err);
      alert("Failed to delete project");
    }
  };

if (!project) return <p>Loading...</p>;
//if (tasks.length === 0) return <p>Loading...</p>;

return (
    <div className="p-6">
        <h2>Project Details</h2>
        <div className="project-card">
        <h3 className="text-2xl mb-4">{project.name}</h3>
        <p>{project.description}</p>
        </div>

        <h2 className="text-2xl mb-4">Task List</h2>
        
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
          ) : (
            tasks.map((task) => (
                <div key={task.id}>
                    <p>{task.title}</p>
                </div>
            ))
          )
        }
        
        
         {/* Only owner can update/delete */}
      
        <div className="mb-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
            onClick={handleUpdateProject}
          >
            Update Project
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDeleteProject}
          >
            Delete Project
          </button>
        </div>
    
     <h4><Link to={`/projects/:id/tasks`}>Add New Task</Link></h4>

    </div>
    
);
}