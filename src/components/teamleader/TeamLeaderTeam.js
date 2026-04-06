import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

const TeamLeaderTeam = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "telecaller",
  });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "user"), (snap) => {
      setUsers(snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsub();
  }, []);

  // 👇 Only Telecallers
  const telecallers = users.filter(u => u.role === "telecaller");

  // ➕ Add
  const handleAdd = async () => {
    await addDoc(collection(db, "user"), form);
    setShowForm(false);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      role: "telecaller",
    });
  };

  // ✏️ Update
  const handleUpdate = async () => {
    await updateDoc(doc(db, "user", editUser.id), editUser);
    setEditUser(null);
  };

  // 🗑 Delete
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "user", id));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          My Team (Telecallers)
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          + Add Telecaller
        </button>
      </div>

      {/* 🔹 Cards */}
      <div className="grid grid-cols-3 gap-6">

        {telecallers.map((u) => (
          <div key={u.id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg">

            <h3 className="font-bold">
              {u.firstName} {u.lastName}
            </h3>

            <p className="text-gray-500 mb-3">
              {u.email}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setEditUser(u)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(u.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>

          </div>
        ))}

      </div>

      {/* 🔹 ADD MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">

          <div className="bg-white p-6 rounded w-96">

            <h2 className="mb-4 font-bold">
              Add Telecaller
            </h2>

            <input
              placeholder="First Name"
              className="w-full border p-2 mb-2"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />

            <input
              placeholder="Last Name"
              className="w-full border p-2 mb-2"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />

            <input
              placeholder="Email"
              className="w-full border p-2 mb-4"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="border px-3 py-1"
              >
                Cancel
              </button>

              <button
                onClick={handleAdd}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 🔹 EDIT MODAL */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">

          <div className="bg-white p-6 rounded w-96">

            <h2 className="mb-4 font-bold">
              Edit Telecaller
            </h2>

            <input
              className="w-full border p-2 mb-2"
              value={editUser.firstName}
              onChange={(e) =>
                setEditUser({ ...editUser, firstName: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-2"
              value={editUser.lastName}
              onChange={(e) =>
                setEditUser({ ...editUser, lastName: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-4"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditUser(null)}
                className="border px-3 py-1"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Update
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default TeamLeaderTeam;