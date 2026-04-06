import React, { useEffect, useState } from "react";
import Sidebar from "../components/superadmin/SuperAdminSidebar";
import Header from "../components/superadmin/SuperAdminHeader";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

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

const SuperAdmin = () => {
  const [users, setUsers] = useState([]);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, "user"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });

    const unsubLeads = onSnapshot(collection(db, "leads"), (snapshot) => {
      setLeads(snapshot.docs.map((doc) => doc.data()));
    });

    return () => {
      unsubUsers();
      unsubLeads();
    };
  }, []);

  // Date helpers
  const today = new Date().toISOString().split("T")[0];

  const getDateFromTimestamp = (ts) => {
    if (!ts) return "";
    return ts?.toDate
      ? ts.toDate().toISOString().split("T")[0]
      : "";
  };

  // Counts
  const totalUsers = users.length;
  const totalLeads = leads.length;
  const converted = leads.filter((l) => l.status === "converted").length;
  const pending = leads.filter((l) => l.status === "pending").length;

  const todayLeads = leads.filter(
    (l) => getDateFromTimestamp(l.createdAt) === today
  ).length;

  const followUpsToday = leads.filter(
    (l) =>
      l.followUpDate &&
      new Date(l.followUpDate).toISOString().split("T")[0] === today
  ).length;

  const conversionRate = totalLeads
    ? ((converted / totalLeads) * 100).toFixed(1)
    : 0;

  // Line Chart (Last 3 days)
  const getDay = (offset) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toISOString().split("T")[0];
  };

  const lineData = [-2, -1, 0].map((offset) => {
    const date = getDay(offset);
    return {
      name:
        offset === 0
          ? "Today"
          : offset === -1
          ? "Yesterday"
          : "2 Days Ago",
      leads: leads.filter(
        (l) => getDateFromTimestamp(l.createdAt) === date
      ).length,
    };
  });

  // Bar Chart
  const barData = [
    { name: "Total", value: totalLeads },
    { name: "Converted", value: converted },
    { name: "Pending", value: pending },
  ];

  // Pie Chart
  const pieData = [
    { name: "Converted", value: converted },
    { name: "Pending", value: pending },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
        <Header />

        <main className="p-6">
          {/* TOP CARDS */}
          <div className="grid grid-cols-5 gap-6">
            <Card title="Users" value={totalUsers} color="text-blue-600" />
            <Card title="Leads" value={totalLeads} color="text-purple-600" />
            <Card title="Converted" value={converted} color="text-green-600" />
            <Card title="Today Leads" value={todayLeads} color="text-orange-600" />
          </div>

          {/*  CHARTS */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            
            {/* Line */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="mb-4 font-semibold">Leads Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="leads" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar */}
            <div className="bg-white p-6 rounded shadow">
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

          {/* PIE */}
          <div className="bg-white p-6 rounded shadow mt-8">
            <h3 className="mb-4 font-semibold">
              Conversion Rate: {conversionRate}%
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
};

//  Reusable Card
const Card = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded shadow">
    <h3>{title}</h3>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

export default SuperAdmin;