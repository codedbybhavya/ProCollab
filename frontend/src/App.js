import { useEffect } from "react";
import API from "./api/axios";
import LoginPage from "./pages/LoginPage";

const App = () => {
  useEffect(() => {
    API.get("/projects")
      .then((res) => console.log("Backend connected:", res.data))
      .catch((err) => console.error("Backend error:", err));
  }, []);

  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default App;
