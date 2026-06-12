import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  LogOut,
  GraduationCap,
} from "lucide-react";

const Sidebar = () => {
const navigate = useNavigate();

const handleLogout=()=>{
    navigate('/');
}

  return (
    <aside className="w-72 bg-slate-900 text-white min-h-screen flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl">
            <GraduationCap size={24} />
          </div>

          <div>
            <h2 className="font-bold text-lg">
              StudentDB
            </h2>
            <p className="text-xs text-slate-400">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 p-4">

        <p className="text-xs uppercase text-slate-500 mb-4 px-3">
          Main Menu
        </p>

        <nav className="space-y-2">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/students"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <Users size={20} />
            Students
          </NavLink>

          <NavLink
            to="/add-student"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <UserPlus size={20} />
            Add Student
          </NavLink>

        </nav>

      </div>

      {/* Bottom User Section */}
      <div className="border-t border-slate-800 p-4">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
            A
          </div>

          <div>
            <h4 className="font-semibold">
              Admin
            </h4>

            <p className="text-xs text-slate-400">
              Administrator
            </p>
          </div>

        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-3 rounded-xl transition" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;