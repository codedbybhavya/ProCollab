import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    api.get(`/projects/${id}`)
      .then((res) => setProject(res.data.project))
      .catch(() => alert("Project not found"));
  }, [id]);

  const handleApply = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await api.post("/applications", {
        projectId: id,
        message,
      });

      alert("Applied successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div>
      <h2>{project.title}</h2>
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Category:</strong> {project.category}</p>
      <p><strong>Required Skills:</strong> {project.requiredSkills.join(", ")}</p>

      <textarea
        placeholder="Message to project owner"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br />

      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

export default ProjectDetailsPage;
