import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout=()=>{
    logout();
    Navigate("/");
  }

  return (
    <div className="bg-slate-800 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">
        Student Management
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 flex items-center gap-2 px-4 py-2 rounded-lg"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default Navbar;