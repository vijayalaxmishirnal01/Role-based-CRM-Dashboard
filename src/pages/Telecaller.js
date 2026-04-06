import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

const TelecallerDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [tasks, setTasks] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    if (!auth.currentUser) return;

    // Fetch only leads assigned to this telecaller
    const qLeads = query(
      collection(db, "leads"),
      where("assignedTo", "==", auth.currentUser.email)
    );
    const unsubscribeLeads = onSnapshot(qLeads, (snapshot) => {
      setLeads(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    // Fetch only tasks assigned to this telecaller
    const qTasks = query(
      collection(db, "tasks"),
      where("assignedTo", "==", auth.currentUser.email)
    );
    const unsubscribeTasks = onSnapshot(qTasks, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeLeads();
      unsubscribeTasks();
    };
  }, [auth.currentUser]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome, Telecaller</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">My Leads</h2>
          <p className="text-3xl mt-2">{leads.length}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">Pending Tasks</h2>
          <p className="text-3xl mt-2">{tasks.filter(t => t.status === "pending").length}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">Completed Tasks</h2>
          <p className="text-3xl mt-2">{tasks.filter(t => t.status === "completed").length}</p>
        </div>
      </div>
    </div>
  );
};

export default TelecallerDashboard;
