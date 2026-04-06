import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-purple-700 text-white fixed p-5">

      <h2 className="text-xl font-bold mb-8">
        Team Leader
      </h2>

      <ul className="space-y-4">

        <li>
          <Link to="/teamleader" className="hover:text-gray-200">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/teamleader/leads">
            Leads
          </Link>
        </li>

        <li>
          <Link to="/teamleader/team">
            Team
          </Link>
        </li>

        <li>
          <Link to="/teamleader/reports">
            Reports
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;