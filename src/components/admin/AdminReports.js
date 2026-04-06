import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AdminReports = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "leads"), (snap) => {
      setLeads(snap.docs.map(doc => doc.data()));
    });

    return () => unsub();
  }, []);

  const total = leads.length;
  const converted = leads.filter(l => l.status === "converted").length;
  const pending = leads.filter(l => l.status === "pending").length;

  // 📊 Data
  const barData = [
    { name: "Total", value: total },
    { name: "Converted", value: converted },
    { name: "Pending", value: pending },
  ];

  const pieData = [
    { name: "Converted", value: converted },
    { name: "Pending", value: pending },
  ];

  const lineData = [
    { name: "Mon", leads: 10 },
    { name: "Tue", leads: 20 },
    { name: "Wed", leads: 15 },
    { name: "Thu", leads: 25 },
    { name: "Fri", leads: 30 },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold mb-6">Reports & Analytics</h2>

      {/* 🔹 Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card title="Total Leads" value={total} />
        <Card title="Converted" value={converted} />
        <Card title="Pending" value={pending} />
      </div>

      {/* 🔹 Charts */}
      <div className="grid grid-cols-2 gap-6">

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="mb-4 font-semibold">Performance</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="mb-4 font-semibold">Conversion</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={100}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Line Chart */}
      <div className="bg-white p-6 rounded-xl shadow mt-8">
        <h3 className="mb-4 font-semibold">Leads Trend</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line dataKey="leads" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </main>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded shadow text-center">
    <h3>{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default AdminReports;