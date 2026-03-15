import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import Navbar from "./pages/Navbar.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import MyRegistrations from "./pages/MyRegistrations.jsx";

import AnimatedBackground from "./components/AnimatedBackground.jsx";

function Layout() {
  return (
    <div className="min-h-screen relative">

      {/* Global animated background */}
      <AnimatedBackground />

      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <div className="relative z-10 container mx-auto p-4">
        <Outlet />
      </div>

    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      {
        path: "create",
        element: (
          <ProtectedRoute requireAdmin>
            <CreateEvent />
          </ProtectedRoute>
        ),
      },

      {
        path: "event/:id",
        element: <EventDetails />,
      },

      {
        path: "my-events",
        element: (
          <ProtectedRoute>
            <MyRegistrations />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}