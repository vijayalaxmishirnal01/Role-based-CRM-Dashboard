import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-5 fixed">
      <h2 className="text-xl font-bold mb-6">Super Admin</h2>

      <Link to="/superadmin" className="block mb-3">Dashboard</Link>
      <Link to="/superadmin/users" className="block mb-3">Users</Link>
      <Link to="/superadmin/leads" className="block mb-3">Leads</Link>
      <Link to="/superadmin/reports" className="block mb-3">Reports</Link>
    </div>
  );
};

export default Sidebar;