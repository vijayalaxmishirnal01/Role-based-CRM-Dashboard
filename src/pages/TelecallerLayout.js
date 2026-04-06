import React from "react";
import Sidebar from "../components/telecaller/Sidebar";
import Header from "../components/telecaller/Header";
import { Outlet } from "react-router-dom";

const TelecallerLayout = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <Header />

        <div className="mt-16 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TelecallerLayout;
