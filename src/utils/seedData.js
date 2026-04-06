import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Dummy Leads
const seedLeads = async () => {
  const leads = [
    {
      company: "SLB",
      contact: "9807654321",
      status: "pending",
      assignedTo: "ram@company.com",
      createdAt: serverTimestamp(),
    },
    {
      company: "Infosys",
      contact: "9876543210",
      status: "converted",
      assignedTo: "sita@company.com",
      createdAt: serverTimestamp(),
    },
    {
      company: "TCS",
      contact: "9123456789",
      status: "interested",
      assignedTo: "ram@company.com",
      createdAt: serverTimestamp(),
    },
  ];

  for (const lead of leads) {
    await addDoc(collection(db, "leads"), lead);
  }
  console.log("Dummy leads seeded ✅");
};

// Dummy Tasks
const seedTasks = async () => {
  const tasks = [
    {
      title: "Follow up with SLB",
      description: "Call client to discuss proposal",
      assignedTo: "ram@company.com",
      priority: "high",
      dueDate: "2026-03-31",
      status: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    {
      title: "Prepare Infosys report",
      description: "Summarize lead conversion details",
      assignedTo: "sita@company.com",
      priority: "medium",
      dueDate: "2026-04-01",
      status: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
  ];

  for (const task of tasks) {
    await addDoc(collection(db, "tasks"), task);
  }
  console.log("Dummy tasks seeded ✅");
};

// Run both
export const seedData = async () => {
  await seedLeads();
  await seedTasks();
};
