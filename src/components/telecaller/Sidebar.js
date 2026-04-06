import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-700 text-white fixed p-5">

      <h2 className="text-xl font-bold mb-8">
        Telecaller Panel
      </h2>

      <ul className="space-y-4">

        <li>
          <Link to="/telecaller" className="hover:text-gray-200">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/telecaller/leads" className="hover:text-gray-200">
            My Leads
          </Link>
        </li>

        <li>
          <Link to="/telecaller/tasks" className="hover:text-gray-200">
            My Tasks
          </Link>
        </li>

      </ul>

    </div>
  );
};

export default Sidebar;