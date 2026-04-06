import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Header />

        <div className="mt-16 p-6">
          <Outlet /> {/* 🔥 pages yaha load honge */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;