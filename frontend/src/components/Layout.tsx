import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <header className="bg-gray-900 border-b border-gray-800 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            RequRate
          </Link>
          <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
            The only place with the raw truth about music.
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        <Outlet />
      </main>

      <footer className="bg-gray-900 border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        Requrate &bull; 2026
      </footer>
    </div>
  );
};

export default Layout;
