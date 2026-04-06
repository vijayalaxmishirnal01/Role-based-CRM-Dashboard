import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, BarChart, Bar,
  PieChart, Pie, Cell, Legend
} from "recharts";

const Manager = () => {
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubLeads = onSnapshot(collection(db, "leads"), (snap) => {
      setLeads(snap.docs.map(doc => doc.data()));
    });

    const unsubUsers = onSnapshot(collection(db, "user"), (snap) => {
      setUsers(snap.docs.map(doc => doc.data()));
    });

    return () => {
      unsubLeads();
      unsubUsers();
    };
  }, []);

  // 📊 Stats
  const totalLeads = leads.length;
  const converted = leads.filter(l => l.status === "converted").length;
  const pending = leads.filter(l => l.status === "pending").length;

  const telecallers = users.filter(u => u.role === "telecaller").length;
  const teamLeaders = users.filter(u => u.role === "teamleader").length;

  // 📈 Chart Data
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
    { name: "Mon", leads: 12 },
    { name: "Tue", leads: 20 },
    { name: "Wed", leads: 18 },
    { name: "Thu", leads: 25 },
    { name: "Fri", leads: 30 },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Manager Dashboard
      </h1>

      {/* 🔹 CARDS */}
      <div className="grid grid-cols-4 gap-6">
        <Card title="Total Leads" value={totalLeads} />
        <Card title="Converted" value={converted} />
        <Card title="Pending" value={pending} />
        <Card title="Telecallers" value={telecallers} />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <Card title="Team Leaders" value={teamLeaders} />
      </div>

      {/* 🔹 CHARTS */}
      <div className="grid grid-cols-2 gap-6 mt-8">

        {/* Line Chart */}
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

      </div>

      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-xl shadow mt-8">
        <h3 className="mb-4 font-semibold">Conversion Ratio</h3>

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

// 🔹 Card UI
const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Manager;