import Sidebar from "../components/manager/Sidebar";
import Header from "../components/manager/Header";
import { Outlet } from "react-router-dom";

const ManagerLayout = () => {
  return (
    <div className="flex">
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

export default ManagerLayout;