import Sidebar from "../components/teamleader/Sidebar";
import Header from "../components/teamleader/Header";
import { Outlet } from "react-router-dom";

const TeamLeaderLayout = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 ml-64">
        <Header />

        <div className="mt-16 p-6">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default TeamLeaderLayout;