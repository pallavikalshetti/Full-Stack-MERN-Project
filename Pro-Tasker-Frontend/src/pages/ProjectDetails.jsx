import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function ProjectDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

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
        alert("Project not found or unauthorized.");
      }
    };
    fetchProject();
  }, [id, user]);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get(`/api/tasks/project/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };
    fetchTasks();
  }, [id, user]);

  // Task status update
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const res = await api.put(
        `/api/tasks/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTasks(tasks.map((t) => (t._id === taskId ? res.data : t)));
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  // Update task
  const handleUpdate = (taskId) => {
    navigate(`/tasks/edit/${taskId}`);
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;

    try {
      await api.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  if (!project) return <p>Loading project...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Project Details</h2>

      <div className="project-card">
        <h3 className="text-xl font-bold">{project.name}</h3>
        <p>{project.description}</p>
      </div>

      <div className="add-project-link">
        <Link to={`/projects/${id}/tasks`} className="text-blue-600 underline">
          ➕ Add New Task
        </Link>
      </div>

      <div className="task-section">
        <h3>Tasks</h3>

        {tasks.length === 0 ? (
          <p>No tasks added yet.</p>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task._id} className="task-card">
                <h4>{task.title}</h4>
                <p>{task.description}</p>

                <div className="task-controls">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>

                  <div className="task-buttons">
                    <Link to={`/tasks/edit/${task._id}`}>
                           Update
                      </Link>

                    <button onClick={() => handleDeleteTask(task._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
