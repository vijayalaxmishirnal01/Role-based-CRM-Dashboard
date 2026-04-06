import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const SuperAdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex justify-between items-center bg-white shadow p-4">
      
      <h1 className="text-xl font-bold">Super Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        
        {/* Profile */}
        <div className="bg-gray-200 rounded-full px-4 py-1">
          Super Admin
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </header>
  );
};

export default SuperAdminHeader;