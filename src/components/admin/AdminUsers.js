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

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "admin",
  });

  // Edit State
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "admin",
  });

  // Fetch Users
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "user"), (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  // Add User
  const addUser = async () => {
    if (!form.firstName || !form.email)
      return alert("Fill required fields");

    await addDoc(collection(db, "user"), form);

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      role: "admin",
    });
  };

  // Delete
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "user", id));
  };

  // Open Edit
  const handleEdit = (user) => {
    setEditUser(user);
    setEditForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  };

  //  Update User
  const updateUser = async () => {
    await updateDoc(doc(db, "user", editUser.id), editForm);
    setEditUser(null);
  };

  //  Search
  const filteredUsers = users.filter((u) =>
    (u.firstName + " " + u.lastName)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
   <main className="p-6">
          <h2 className="text-2xl font-bold mb-6">User Management</h2>

          {/* Search */}
          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 mb-4 w-full rounded"
          />

          {/* ➕ Add Form */}
          <div className="bg-white p-4 rounded shadow mb-6 flex gap-3 flex-wrap">
            <input
              type="text"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="border p-2 rounded"
            />

            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="teamleader">Team Leader</option>
              <option value="telecaller">Telecaller</option>
            </select>

            <button
              onClick={addUser}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add User
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded shadow overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="p-3">
                      {user.firstName} {user.lastName}
                    </td>

                    <td>{user.email}</td>

                    <td className="capitalize">
                      {user.role || "N/A"}
                    </td>

                    <td className="flex gap-2 p-3">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteUser(user.id)}
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

          {/* EDIT MODAL */}
          {editUser && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow w-96">
                <h2 className="text-xl font-bold mb-4">Edit User</h2>

                <input
                  type="text"
                  value={editForm.firstName}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      firstName: e.target.value,
                    })
                  }
                  className="border p-2 w-full mb-3"
                />

                <input
                  type="text"
                  value={editForm.lastName}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      lastName: e.target.value,
                    })
                  }
                  className="border p-2 w-full mb-3"
                />

                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      email: e.target.value,
                    })
                  }
                  className="border p-2 w-full mb-3"
                />

                <select
                  value={editForm.role}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      role: e.target.value,
                    })
                  }
                  className="border p-2 w-full mb-4"
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="teamleader">Team Leader</option>
                  <option value="telecaller">Telecaller</option>
                </select>

                <div className="flex justify-between">
                  <button
                    onClick={() => setEditUser(null)}
                    className="bg-gray-400 text-white px-4 py-1 rounded"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={updateUser}
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
  );
};

export default AdminUsers;