import { useEffect, useState } from "react";
import { collection, onSnapshot, updateDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const MyLeads = () => {
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({
    name: "",
    company: "",
    contact: "",
    status: "pending",
    assignedTo: "Telecaller"
  });
  const [editingLead, setEditingLead] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "leads"), (snapshot) => {
      setLeads(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleAddLead = async (e) => {
    e.preventDefault();
    if (!newLead.name || !newLead.contact) return;

    await addDoc(collection(db, "leads"), {
      ...newLead,
      createdAt: new Date()
    });

    setNewLead({ name: "", company: "", contact: "", status: "pending", assignedTo: "Telecaller" });
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
  };

  const handleUpdateLead = async (e) => {
    e.preventDefault();
    if (!editingLead) return;

    const leadRef = doc(db, "leads", editingLead.id);
    await updateDoc(leadRef, {
      name: editingLead.name,
      company: editingLead.company,
      contact: editingLead.contact,
      status: editingLead.status,
      assignedTo: editingLead.assignedTo
    });

    setEditingLead(null); // close edit mode
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Leads</h1>

      {/* Add Lead Form */}
      <form onSubmit={handleAddLead} className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Name"
          value={newLead.name}
          onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
          className="border p-2 rounded w-1/4"
        />
        <input
          type="text"
          placeholder="Company"
          value={newLead.company}
          onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
          className="border p-2 rounded w-1/4"
        />
        <input
          type="text"
          placeholder="Contact"
          value={newLead.contact}
          onChange={(e) => setNewLead({ ...newLead, contact: e.target.value })}
          className="border p-2 rounded w-1/4"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Lead
        </button>
      </form>

      {/* Edit Lead Form */}
      {editingLead && (
        <form onSubmit={handleUpdateLead} className="mb-6 flex gap-4 bg-yellow-100 p-4 rounded">
          <input
            type="text"
            value={editingLead.name}
            onChange={(e) => setEditingLead({ ...editingLead, name: e.target.value })}
            className="border p-2 rounded w-1/4"
          />
          <input
            type="text"
            value={editingLead.company}
            onChange={(e) => setEditingLead({ ...editingLead, company: e.target.value })}
            className="border p-2 rounded w-1/4"
          />
          <input
            type="text"
            value={editingLead.contact}
            onChange={(e) => setEditingLead({ ...editingLead, contact: e.target.value })}
            className="border p-2 rounded w-1/4"
          />
          <select
            value={editingLead.status}
            onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value })}
            className="border p-2 rounded w-1/4"
          >
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Update Lead
          </button>
        </form>
      )}

      {/* Leads Table */}
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Company</th>
            <th className="p-3 text-left">Contact</th>
            <th className="p-3 text-left">Assigned To</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b">
              <td className="p-3">{lead.name}</td>
              <td className="p-3">{lead.company}</td>
              <td className="p-3">{lead.contact}</td>
              <td className="p-3">{lead.assignedTo}</td>
              <td className="p-3 capitalize">{lead.status}</td>
              <td className="p-3">
                <button
                  onClick={() => handleEdit(lead)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyLeads;
