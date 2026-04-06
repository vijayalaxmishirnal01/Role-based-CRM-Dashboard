import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Admin = () => {
  const [user, setUsers] = useState([]);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, "user"), (snap) => {
      setUsers(snap.docs.map(doc => doc.data()));
    });

    const unsubLeads = onSnapshot(collection(db, "leads"), (snap) => {
      setLeads(snap.docs.map(doc => doc.data()));
    });

    return () => {
      unsubUsers();
      unsubLeads();
    };
  }, []);

  // 📊 Stats
  const totalUsers = user.length;
  const totalLeads = leads.length;
  const converted = leads.filter(l => l.status === "converted").length;
  const pending = leads.filter(l => l.status === "pending").length;

  const conversionRate = totalLeads
    ? ((converted / totalLeads) * 100).toFixed(1)
    : 0;

  // 📈 Data
  const barData = [
    { name: "Total", value: totalLeads },
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
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* 🔹 Cards */}
      <div className="grid grid-cols-4 gap-6">
        <Card title="User" value={totalUsers} />
        <Card title="Leads" value={totalLeads} />
        <Card title="Converted" value={converted} />
        <Card title="Conversion %" value={conversionRate + "%"} />
      </div>

      {/* 🔹 Charts */}
      <div className="grid grid-cols-2 gap-6 mt-8">

        <div className="bg-white p-6 rounded-xl shadow">
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

      </div>

      {/* 🔹 Pie Chart */}
      <div className="bg-white p-6 rounded-xl shadow mt-8">
        <h3 className="mb-4 font-semibold">
          Conversion Rate: {conversionRate}%
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

// 🔹 Card Component
const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Admin;