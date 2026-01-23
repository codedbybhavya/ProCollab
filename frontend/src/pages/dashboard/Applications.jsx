import { useEffect, useState } from "react";
import api from "../../api/axios";

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get("/applications/my-projects").then((res) => {
      setApplications(res.data.applications || []);
    });
  }, []);

  return (
    <div>
      <h2>Applications</h2>

      {applications.length === 0 && <p>No applications received.</p>}

      {applications.map((a) => (
        <div key={a._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>Project:</strong> {a.projectId?.title}</p>
          <p><strong>Applicant:</strong> {a.applicantId?.name}</p>
          <p><strong>Status:</strong> {a.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Applications;
