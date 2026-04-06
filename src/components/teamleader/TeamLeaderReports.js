import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, BarChart, Bar,
  PieChart, Pie, Cell, Legend
} from "recharts";

const TeamLeaderReports = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "leads"), (snap) => {
      setLeads(snap.docs.map(doc => doc.data()));
    });
    return () => unsub();
  }, []);

  // Stats
  const total = leads.length;
  const converted = leads.filter(l => l.status === "converted").length;
  const pending = leads.filter(l => l.status === "pending").length;

  const conversionRate = total
    ? ((converted / total) * 100).toFixed(1)
    : 0;

  // Data
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
    { name: "Mon", leads: 12 },
    { name: "Tue", leads: 18 },
    { name: "Wed", leads: 25 },
    { name: "Thu", leads: 30 },
    { name: "Fri", leads: 35 },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-2">
        Reports & Analytics
      </h1>

      <p className="text-gray-500 mb-6">
        Track your team performance and lead conversions
      </p>

      {/* KPI CARDS */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card title="Total Leads" value={total} />
        <Card title="Converted" value={converted} />
        <Card title="Pending" value={pending} />
        <Card title="Conversion %" value={conversionRate + "%"} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-6">

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="mb-4 font-semibold">
            Leads Trend
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="leads" stroke="#8b5cf6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="mb-4 font-semibold">
            Performance
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* 🔹 PIE CHART */}
      <div className="bg-white p-6 rounded-xl shadow mt-8">
        <h3 className="mb-4 font-semibold">
          Conversion Ratio
        </h3>

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
  );
};

// 🔹 Card
const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition">

    <h3 className="text-gray-500 text-sm">
      {title}
    </h3>

    <p className="text-2xl font-bold mt-2">
      {value}
    </p>

  </div>
);

export default TeamLeaderReports;