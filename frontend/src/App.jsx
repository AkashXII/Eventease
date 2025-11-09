import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CreateEvent from "./pages/CreateEvent.jsx"; // (we'll make this later)
import Navbar from "./pages/Navbar.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </>
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
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
