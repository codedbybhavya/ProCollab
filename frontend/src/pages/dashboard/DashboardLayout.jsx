import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: "220px", borderRight: "1px solid #ddd", padding: "20px" }}>
        <h3>Dashboard</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link to="my-projects">My Projects</Link>
          </li>
          <li>
            <Link to="applications">Applications</Link>
          </li>
        </ul>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
