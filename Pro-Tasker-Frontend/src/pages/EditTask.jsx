import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function EditTask() {
  const { id } = useParams(); // This should be the task ID
  const [task, setTask] = useState({ title: "", description: "", status: "To Do" });
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Fetch the task by ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log("Fetched task data:", res.data); // ✅ Add this line
        //setTask(res.data);
         setTask({ 
          title: res.data.title || "",
          description: res.data.description || "",
          status: res.data.status || "To Do",
        });
      } catch (err) {
        console.error("Failed to fetch task:", err);
      } finally {
        setLoading(false); // stop loading
      }
    };
    fetchTask();
  }, [id, user.token]);

  // Fix here: using name, not title
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/tasks/${id}`, task, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      navigate(-1); // Go back to previous page or use `/projects/:projectId`
      //navigate(`/projects/${id}`);
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

   // If still loading or task is not fetched yet, show loading
  if (loading || !task) {
    return <p>Loading task...</p>;
  }

  return (
    <div className="edit-page card">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Name:</label>
          <input type="text" name="title" value={task.title} onChange={handleChange}
          placeholder="Enter task title" required/>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea name="description" value={task.description} onChange={handleChange}
            placeholder="Enter task description" required/>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select name="status" value={task.status} onChange={handleChange}>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>

        <button type="submit" className="primary">Save Changes</button>
      </form>
    </div>
  );
}
