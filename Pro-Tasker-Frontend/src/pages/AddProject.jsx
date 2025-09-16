import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
    const { id } = useParams();
    const { user } = useAuth();
    const [project, setProject] = useState(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/projects", { name, description },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            );
            navigate("/dashboard");
        } catch (err) {
            console.error("Project creation error:", err);
            setError("Project creation failed");
        }
    };
    
    return (
        <div className="main-column">
          <div className="card"> 
        <h2 className="text-2xl mb-4">Add Project</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="block border p-2 mb-2 w-full" /> 
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="block border p-2 mb-2 w-full" />
            <button className="primary">Add</button>
        </form>
        </div>
        </div>
    );
}