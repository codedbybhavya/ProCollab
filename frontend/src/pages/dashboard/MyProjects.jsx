import { useEffect, useState } from "react";
import api from "../../api/axios";

const MyProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((res) => {
      // later we’ll create /projects/my-projects
      setProjects(res.data.projects || []);
    });
  }, []);

  return (
    <div>
      <h2>My Projects</h2>

      {projects.length === 0 && <p>No projects created yet.</p>}

      {projects.map((p) => (
        <div key={p._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <h4>{p.title}</h4>
          <p>{p.category}</p>
        </div>
      ))}
    </div>
  );
};

export default MyProjects;
