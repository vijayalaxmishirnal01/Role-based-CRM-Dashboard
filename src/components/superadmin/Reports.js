import React, { useEffect, useState } from "react";
import Sidebar from "../../components/superadmin/SuperAdminSidebar";
import Header from "../../components/superadmin/SuperAdminHeader";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Reports = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "leads"), (snapshot) => {
      setLeads(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsub();
  }, []);

  //  Counts
  const total = leads.length;
  const converted = leads.filter((l) => l.status === "converted").length;
  const pending = leads.filter((l) => l.status === "pending").length;
  const interested = leads.filter((l) => l.status === "interested").length;

  //  Bar Chart Data
  const barData = [
    { name: "Total", value: total },
    { name: "Converted", value: converted },
    { name: "Pending", value: pending },
    { name: "Interested", value: interested },
  ];

  // Pie Chart Data
  const pieData = [
    { name: "Converted", value: converted },
    { name: "Pending", value: pending },
    { name: "Interested", value: interested },
  ];

  const COLORS = ["#00C49F", "#FF8042", "#0088FE"];

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
        <Header />

        <main className="p-6">
          <h2 className="text-2xl font-bold mb-6">Reports & Analytics</h2>

          {/*  Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow text-center">
              <h4>Total Leads</h4>
              <p className="text-2xl font-bold text-blue-600">{total}</p>
            </div>

            <div className="bg-white p-4 rounded shadow text-center">
              <h4>Converted</h4>
              <p className="text-2xl font-bold text-green-600">{converted}</p>
            </div>

            <div className="bg-white p-4 rounded shadow text-center">
              <h4>Pending</h4>
              <p className="text-2xl font-bold text-red-600">{pending}</p>
            </div>

            <div className="bg-white p-4 rounded shadow text-center">
              <h4>Interested</h4>
              <p className="text-2xl font-bold text-yellow-600">{interested}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="mb-4 font-semibold">Leads Overview</h3>

              <BarChart width={400} height={300} data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="mb-4 font-semibold">Lead Distribution</h3>

              <PieChart width={400} height={300}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;