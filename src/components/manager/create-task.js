import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

const CreateTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "medium",
    dueDate: "",
  });

  const [users, setUsers] = useState([]);

  // Get telecallers
  useEffect(() => {
    const fetchUsers = async () => {
      const snap = await getDocs(collection(db, "user"));

      const telecallers = snap.docs
        .map((doc) => doc.data())
        .filter((u) => u.role === "telecaller");

      setUsers(telecallers);
    };

    fetchUsers();
  }, []);

  // Create Task
  const handleCreate = async () => {
    if (!task.title || !task.assignedTo || !task.dueDate) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        ...task,
        status: "pending",
        createdAt: serverTimestamp(), // ✅ Firestore timestamp
        updatedAt: serverTimestamp(),
      });

      alert("Task Assigned Successfully");

      setTask({
        title: "",
        description: "",
        assignedTo: "",
        priority: "medium",
        dueDate: "",
      });
    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Assign Task to Telecaller</h1>

      {/* Title */}
      <input
        placeholder="Task Title"
        className="border p-2 w-full mb-3"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />

      {/* Description */}
      <textarea
        placeholder="Description"
        className="border p-2 w-full mb-3"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />

      {/* Telecaller Dropdown */}
      <select
        className="border p-2 w-full mb-3"
        value={task.assignedTo}
        onChange={(e) => setTask({ ...task, assignedTo: e.target.value })}
      >
        <option value="">Select Telecaller</option>
        {users.map((u, i) => (
          <option key={i} value={u.email}>
            {u.name} ({u.email})
          </option>
        ))}
      </select>

      {/* Priority */}
      <select
        className="border p-2 w-full mb-3"
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Due Date */}
      <input
        type="date"
        className="border p-2 w-full mb-4"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
      />

      {/* Button */}
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
      >
        Assign Task
      </button>
    </div>
  );
};

export default CreateTask;
