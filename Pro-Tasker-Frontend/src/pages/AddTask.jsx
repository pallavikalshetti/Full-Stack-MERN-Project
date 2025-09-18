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
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");

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

  // Start editing a task
  const handleEditClick = (task) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStatus(task.status);
  };

  // Update task
  const handleUpdateTask = async (taskId) => {
    if (!editTitle) return alert("Task title is required");

    try {
      const res = await api.put(
        `/api/tasks/${taskId}`,
        { title: editTitle, description: editDescription, status: editStatus },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTasks(tasks.map((t) => (t.id === taskId ? res.data : t)));
      setEditingTask(null);
      setEditTitle("");
      setEditDescription("");
      setEditStatus("");
    } catch (err) {
      console.error("Failed to update task:", err);
      alert("Failed to update task");
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;

    try {
      await api.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Tasks for Project</h2>

      {/* Add New Task */}
      <div className="mb-6 border p-4 rounded">
        <h3 className="text-xl mb-2">Add New Task</h3>
        <input type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 mb-2 w-full"
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <button
          onClick={handleAddTask}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>
  </div>
  );
}
