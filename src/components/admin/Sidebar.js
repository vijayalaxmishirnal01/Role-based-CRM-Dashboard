import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-5 fixed">

      <h2 className="text-xl font-bold mb-6">CRM Admin</h2>

      <NavLink to="/admin" className="block p-2">Dashboard</NavLink>
      <NavLink to="/admin/users" className="block p-2">Users</NavLink>
      <NavLink to="/admin/leads" className="block p-2">Leads</NavLink>
      <NavLink to="/admin/reports" className="block p-2">Reports</NavLink>

    </div>
  );
};

export default Sidebar;