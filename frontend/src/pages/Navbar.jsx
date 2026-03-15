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

  const btnStyle =
    "shadow-[inset_0_0_0_2px_#616467] px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-semibold bg-transparent hover:bg-[#616467] hover:text-white text-white transition duration-200";

  return (
    <nav className="text-white p-3 flex justify-between items-center">
      <Link to="/" className="font-semibold text-xl">
        EventEase
      </Link>

      <div className="space-x-3 flex items-center">
        {user ? (
          <>
            {/* Hello User FIRST */}
            <span className="text-sm text-gray-300">
              Hello, {user.role === "admin" ? "Admin" : "User"}
            </span>

            {/* My Events */}
            <Link to="/my-events">
              <button className={btnStyle}>My Events</button>
            </Link>

            {/* Admin Create Event */}
            {user.role === "admin" && (
              <Link to="/create">
                <button className={btnStyle}>Create Event</button>
              </Link>
            )}

            {/* Logout */}
            <button onClick={handleLogout} className={btnStyle}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className={btnStyle}>Login</button>
            </Link>

            <Link to="/register">
              <button className={btnStyle}>Register</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}