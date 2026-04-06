import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-4 fixed top-0 left-64 right-0">

      <h1 className="font-bold text-lg">Manager Dashboard</h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-1 rounded"
      >
        Logout
      </button>

    </header>
  );
};

export default Header;