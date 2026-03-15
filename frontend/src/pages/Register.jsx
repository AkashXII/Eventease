import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      setMsg("Registered successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };
const btnStyle =
    "shadow-[inset_0_0_0_2px_#616467] px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-semibold bg-transparent hover:bg-[#616467] hover:text-white text-white transition duration-200";
  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>
      {msg && <div className="text-green-600 mb-2 text-center">{msg}</div>}
      {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
          Register
        </button>
      </form>
    </div>
  );
}
