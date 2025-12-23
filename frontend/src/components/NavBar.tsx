import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between">
      <h1 className="font-bold text-xl">IntelliVision</h1>

      <div className="flex items-center gap-4">
        {user?.role === "admin" && (
          <Link to="/admin" className="text-blue-600">Admin</Link>
        )}
        <span>{user?.email}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
