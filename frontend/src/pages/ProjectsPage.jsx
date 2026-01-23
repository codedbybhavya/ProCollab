import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get("/projects").then((res) => {
            setProjects(res.data.projects);
        });
    }, []);

    return (
        <div>
            <h2>Explore Projects</h2>
            {projects.map((p) => (
                <div key={p._id}>
                    <h3>
                        <Link to={`/projects/${p._id}`}>{p.title}</Link>
                    </h3>
                    <p>{p.category}</p>
                </div>
            ))}
        </div>
    );
};

export default ProjectsPage;
