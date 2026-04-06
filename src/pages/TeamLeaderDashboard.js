import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer
} from "recharts";

const TeamLeaderDashboard = () => {
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

  const data = [
    { name: "Total", value: totalLeads },
    { name: "Converted", value: converted },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-2">
        Dashboard Overview
      </h1>

      <p className="text-gray-500 mb-6">
        Monitor your team performance and leads
      </p>

      {/* 🔹 CARDS */}
      <div className="grid grid-cols-5 gap-6">

        <Card title="Total Leads" value={totalLeads} />
        <Card title="Converted" value={converted} />
        <Card title="Pending" value={pending} />
        <Card title="Telecallers" value={telecallers} />

      </div>

      {/* 🔹 CHART */}
      <div className="bg-white p-6 rounded-xl shadow mt-8">

        <h3 className="mb-4 font-semibold">
          Performance Overview
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

// 🔹 Card Component
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

export default TeamLeaderDashboard;