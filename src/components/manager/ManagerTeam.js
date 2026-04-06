import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

const ManagerTeam = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "user"), (snap) => {
      setUsers(snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsub();
  }, []);

  // 🔍 Filter Logic
  const filteredUsers =
    filter === "all"
      ? users
      : users.filter(u => u.role === filter);

  // ✏️ Edit Save
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
        <h1 className="text-2xl font-bold">Team Management</h1>

        {/* 🔍 Filter */}
        <select
          className="border p-2 rounded"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="teamleader">Team Leader</option>
          <option value="telecaller">Telecaller</option>
        </select>
      </div>

      {/* 🔹 Users Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="text-center border-b">

                <td className="p-3">
                  {u.firstName} {u.lastName}
                </td>

                <td>{u.email}</td>
                <td>{u.role}</td>

                <td className="space-x-2">
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
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* 🔹 EDIT MODAL */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">

          <div className="bg-white p-6 rounded w-96">

            <h2 className="mb-4 font-bold">Edit User</h2>

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

            <select
              className="w-full border p-2 mb-4"
              value={editUser.role}
              onChange={(e) =>
                setEditUser({ ...editUser, role: e.target.value })
              }
            >
              <option value="telecaller">Telecaller</option>
              <option value="teamleader">Team Leader</option>
            </select>

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
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ManagerTeam;