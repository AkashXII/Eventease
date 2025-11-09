import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white p-3 flex justify-between items-center">
      <Link to="/" className="font-semibold text-xl">EventEase</Link>

      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            <span className="text-sm text-gray-300">
              Hello, {user.role === "admin" ? "Admin" : "User"}
            </span>

            {user.role === "admin" && (
              <Link
                to="/create"
                className="bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                + Create Event
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
