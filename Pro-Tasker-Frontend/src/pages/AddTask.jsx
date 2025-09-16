// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../services/api";
// import { useAuth } from "../context/AuthContext";

// export default function AddTask() {
//   const { id } = useParams(); // project id
//   const { user } = useAuth();
//   const [tasks, setTasks] = useState([]);
//   const [newTaskTitle, setNewTaskTitle] = useState("");
//   const [editingTask, setEditingTask] = useState(null); // task being edited
//   const [editingTitle, setEditingTitle] = useState("");

//   // Fetch all tasks for this project
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const res = await api.get(`/api/tasks/project/${id}`, {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         setTasks(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchTasks();
//   }, [id, user]);

//   // Add new task
//   const handleAddTask = async () => {
//     if (!newTaskTitle) return;
//     try {
//       const res = await api.post(
//         `/api/projects/${id}/tasks`,
//         { title: newTaskTitle },
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );
//       setTasks([...tasks, res.data]);
//       setNewTaskTitle("");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add task");
//     }
//   };

//   // Start editing a task
//   const handleEditClick = (task) => {
//     setEditingTask(task.id);
//     setEditingTitle(task.title);
//   };

//   // Save edited task
//   const handleUpdateTask = async (taskId) => {
//     if (!editingTitle) return;
//     try {
//       const res = await api.put(
//         `/api/tasks/${taskId}`,
//         { title: editingTitle },
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );
//       setTasks(tasks.map((t) => (t.id === taskId ? res.data : t)));
//       setEditingTask(null);
//       setEditingTitle("");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update task");
//     }
//   };

//   // Delete a task
//   const handleDeleteTask = async (taskId) => {
//     const confirm = window.confirm("Are you sure you want to delete this task?");
//     if (!confirm) return;

//     try {
//       await api.delete(`/api/tasks/${taskId}`, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setTasks(tasks.filter((t) => t.id !== taskId));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete task");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl mb-4">Tasks</h2>

//       {/* Add New Task */}
//       <div className="mb-4">
//         <input type="text" placeholder="New Task Title" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} className="border px-2 py-1 mr-2"/>
//         <button onClick={handleAddTask} className="bg-green-500 text-white px-3 py-1 rounded">Add Task</button>
//       </div>

//       {/* Task List */}
//       {tasks.length === 0 ? (
//         <p>No tasks yet.</p>
//       ) : (
//         tasks.map((task) => (
//           <div key={task.id} className="mb-2 flex items-center justify-between border p-2 rounded">
//             {editingTask === task.id ? (
//               <>
//                 <input type="text" value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)} className="border px-2 py-1 mr-2 flex-grow"/>
//                 <button onClick={() => handleUpdateTask(task.id)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Save</button>
//                 <button onClick={() => setEditingTask(null)} className="bg-gray-400 text-white px-2 py-1 rounded">Cancel</button>
//               </>
//             ) : (
//               <>
//                 <span>{task.title}</span>
//                 <div>
//                   <button onClick={() => handleEditClick(task)} className="bg-yellow-400 text-white px-2 py-1 rounded mr-2">Edit</button>
//                   <button onClick={() => handleDeleteTask(task.id)}className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
//                 </div>
//               </>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function AddTask() {
  const { id } = useParams(); // project ID
  const { user } = useAuth();

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
      const res = await api.post(
        `/api/projects/${id}/tasks`,
        { title, description, status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTasks([...tasks, res.data]);
      setTitle("");
      setDescription("");
      setStatus("To Do");
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
        <input
          type="text"
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

      {/* Task List */}
      <h3 className="text-xl mb-2">Task List</h3>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="border p-3 mb-2 rounded flex justify-between items-center"
          >
            {editingTask === task.id ? (
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border p-1 mb-1 w-full"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="border p-1 mb-1 w-full"
                />
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="border p-1 mb-1 w-full"
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateTask(task.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    className="bg-gray-400 text-white px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between w-full">
                <div>
                  <p className="font-semibold">{task.title}</p>
                  <p>{task.description}</p>
                  <p className="italic">{task.status}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(task)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
