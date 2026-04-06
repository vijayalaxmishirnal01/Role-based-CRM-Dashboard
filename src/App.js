import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import TeamLogin from "./components/TeamLogin";
import OtpPage from "./components/OtpPage";
import Register from "./components/Register";
import SuperAdmin from "./pages/SuperAdmin";
import Admin from "./pages/Admin";
import RoleRedirect from "./pages/RoleRedirect"; 
import Users from "./components/superadmin/Users";
import Leads from "./components/superadmin/Leads";
import Reports from "./components/superadmin/Reports";

import AdminLeads from "./components/admin/AdminLeads";
import AdminUsers from "./components/admin/AdminUsers";
import AdminReports from "./components/admin/AdminReports";
import AdminLayout from "./pages/AdminLayout";

import Manager from "./pages/Manager";
import ManagerLeads from "./components/manager/ManagerLeads";
import ManagerReports from "./components/manager/ManagerReports";
import ManagerTeam from "./components/manager/ManagerTeam";
import CreateTask from "./components/manager/create-task";
import ManagerLayout from "./pages/ManagerLayout";

import TeamLeaderLayout from "./pages/TeamLeaderLayout";
import TeamLeaderDashboard from "./pages/TeamLeaderDashboard";
import TeamLeaderLeads from "./components/teamleader/TeamLeaderLeads";
import TeamLeaderTeam from "./components/teamleader/TeamLeaderTeam";
import TeamLeaderReports from "./components/teamleader/TeamLeaderReports";

import TelecallerLayout from "./pages/TelecallerLayout";
import MyLeads from "./components/telecaller/MyLeads";
import Telecaller from "./pages/Telecaller";
import MyTasks from "./components/telecaller/tasks";


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<RoleRedirect />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/team-login" element={<TeamLogin />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/register" element={<Register />} />

        {/* Super Admin */}
        <Route path="/superadmin" element={<SuperAdmin />} />
        <Route path="/superadmin/users" element={<Users />} />
        <Route path="/superadmin/leads" element={<Leads />} />
        <Route path="/superadmin/reports" element={<Reports />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

        {/* MANAGER ROUTES */}
        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<Manager />} />
          <Route path="leads" element={<ManagerLeads />} />
          <Route path="team" element={<ManagerTeam />} />
          <Route path="reports" element={<ManagerReports />} />
          <Route path="create-task" element={<CreateTask />} />
        </Route>

        {/* TeamLeader Dashboards */}
        <Route path="/teamleader" element={<TeamLeaderLayout />}>
        <Route index element={<TeamLeaderDashboard />} />
        <Route path="leads" element={<TeamLeaderLeads />} />
        <Route path="team" element={<TeamLeaderTeam />} />
        <Route path="reports" element={<TeamLeaderReports />} />
      </Route>

        {/* Telecaller Dashboards */}
        <Route path="/telecaller" element={<TelecallerLayout />}>
        <Route index element={<Telecaller />} />
        <Route path="leads" element={<MyLeads />} />
        <Route path="tasks" element={<MyTasks />} />
      </Route>

      </Routes>
    </Router>
  );
}

export default App;
