import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-green-900 text-white p-5 fixed">

      <h2 className="text-xl font-bold mb-6">Manager Panel</h2>

      <NavLink to="/manager" className="block p-2">Dashboard</NavLink>
      <NavLink to="/manager/leads" className="block p-2">Leads</NavLink>
      <NavLink to="/manager/team" className="block p-2">Team</NavLink>
      <NavLink to="/manager/reports" className="block p-2">Reports</NavLink>
      <NavLink to="/manager/create-task" className="block p-2">Create Task</NavLink>

    </div>
  );
};

export default Sidebar;