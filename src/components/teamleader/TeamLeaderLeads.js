import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc
} from "firebase/firestore";

const TeamLeaderLeads = () => {
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubLeads = onSnapshot(collection(db, "leads"), (snap) => {
      setLeads(snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    const unsubUsers = onSnapshot(collection(db, "user"), (snap) => {
      setUsers(snap.docs.map(doc => doc.data()));
    });

    return () => {
      unsubLeads();
      unsubUsers();
    };
  }, []);

  // 👇 Only Telecallers
  const telecallers = users.filter(u => u.role === "telecaller");

  // 🔥 Assign Function
  const assignLead = async (id, name) => {
    await updateDoc(doc(db, "leads", id), {
      assignedTo: name
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-2">
        Leads Management
      </h1>

      <p className="text-gray-500 mb-6">
        Assign leads to your team members
      </p>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-3">Company</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Assign Lead</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="text-center border-b hover:bg-gray-50">

                <td className="p-3 font-semibold">
                  {l.company}
                </td>

                {/* Status Badge */}
                <td>
                  <span className={`px-2 py-1 rounded text-sm
                    ${l.status === "converted" ? "bg-green-100 text-green-700" :
                      l.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-600"}
                  `}>
                    {l.status}
                  </span>
                </td>

                {/* Assigned */}
                <td>
                  {l.assignedTo || "Not Assigned"}
                </td>

                {/* Assign Dropdown */}
                <td>
                  <select
                    className="border p-1 rounded"
                    onChange={(e) =>
                      assignLead(l.id, e.target.value)
                    }
                  >
                    <option>Select</option>

                    {telecallers.map((t, i) => (
                      <option key={i}>
                        {t.firstName} {t.lastName}
                      </option>
                    ))}

                  </select>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TeamLeaderLeads;
