import React, { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    company: "",
    contact: "",
    status: "pending",
  });

  //  Real-time fetch
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "leads"), (snapshot) => {
      setLeads(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  // ➕ Add Lead
  const addLead = async () => {
    if (!form.company) return alert("Enter company");

    await addDoc(collection(db, "leads"), {
      ...form,
      createdAt: new Date(),
    });

    setForm({ company: "", contact: "", status: "pending" });
  };

  // Delete
  const deleteLead = async (id) => {
    await deleteDoc(doc(db, "leads", id));
  };

  // Update Status
  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "leads", id), { status });
  };

  //  Search
  const filteredLeads = leads.filter((l) =>
    l.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-6">
          <h2 className="text-2xl font-bold mb-6">Leads Management</h2>

          {/* Search */}
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 mb-4 w-full rounded"
          />

          {/* ➕ Add Lead */}
          <div className="bg-white p-4 rounded shadow mb-6 flex gap-3 flex-wrap">
            <input
              type="text"
              placeholder="Company"
              value={form.company}
              onChange={(e) =>
                setForm({ ...form, company: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Contact"
              value={form.contact}
              onChange={(e) =>
                setForm({ ...form, contact: e.target.value })
              }
              className="border p-2 rounded"
            />

            <button
              onClick={addLead}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Lead
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded shadow overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Company</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-t">
                    <td className="p-3">{lead.company}</td>
                    <td>{lead.contact}</td>

                    <td>
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          updateStatus(lead.id, e.target.value)
                        }
                        className="border p-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="interested">Interested</option>
                        <option value="not interested">Not Interested</option>
                        <option value="converted">Converted</option>
                      </select>
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
  );
};

export default Leads;