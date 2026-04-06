import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/team-login");
  };

  return (
    <div className="fixed left-64 right-0 top-0 bg-white shadow flex justify-between items-center px-6 py-4">

      <h2 className="font-bold text-lg">
        Team Leader Panel
      </h2>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-1 rounded"
      >
        Logout
      </button>

    </div>
  );
};

export default Header;