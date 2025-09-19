import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const { id } = useParams(); // project ID
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do"); // default status
 
  // Fetch tasks for the project
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

  // Create new task
  const handleAddTask = async () => {
    if (!title) return alert("Task title is required");
    try {
      
      const res = await api.post(`/api/tasks/project/${id}`,
        { title, description, status, id },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setTasks([...tasks, res.data]);
      setTitle("");
      setDescription("");
      setStatus("To Do");
      navigate(`/projects/${id}`);
    } catch (err) {
      console.error("Failed to create task:", err);
      alert("Failed to create task");
    }
  };

  
  return (
    <div className="card task-form">
      <h2 className="text-2xl mb-4">Tasks for Project</h2>

      {/* Add New Task */}
      <div className="mb-6 border p-4 rounded">
        <h3 className="text-xl mb-2">Add New Task</h3>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-2 w-full"/>
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-2 w-full"/>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 mb-2 w-full">
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <button onClick={handleAddTask}mclassName="bg-green-500 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </div>
  </div>
  );
}
