import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
        const res = await api.get("/api/projects", {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        setProjects(res.data);
        };
        fetchProjects();
        }, [user]);


    return (
        <div className="p-6 dashboard">
            <h2 className="text-2xl mb-4">My Projects</h2>
            <div className="projects-container">
            {
                projects.map((project) => (
                
                <div key={project._id} className="border p-3 mb-2">
                    <Link to={`/projects/${project._id}`}>{project.name}</Link>
                </div>
                
                ))
            } 
            </div>
            <br></br>
            <h4><Link to={`/projects`}>Add New Project</Link></h4>

        </div>
    );
}
