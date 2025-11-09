import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  // If we want to go back home
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-3">Oops!</h1>
        <p className="text-lg mb-2">Something went wrong while loading this page.</p>
        {error?.statusText || error?.message ? (
          <p className="text-sm text-gray-500 mb-6">
            <i>{error.statusText || error.message}</i>
          </p>
        ) : (
          <p className="text-sm text-gray-500 mb-6">Unknown error occurred.</p>
        )}

        <button
          onClick={handleGoHome}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all duration-200"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
