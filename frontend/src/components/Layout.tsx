import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col selection:bg-white selection:text-black">
      <header className="bg-zinc-950 border-b border-zinc-800 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-light tracking-wide text-white hover:text-zinc-300 transition-colors"
          >
            RequRate
          </Link>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 tracking-wider uppercase">
            The only place with the raw truth about music.
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        <Outlet />
      </main>

      <footer className="bg-zinc-950 border-t border-zinc-800 text-center py-4 text-xs font-mono text-zinc-500">
        Requrate &bull; 2026
      </footer>
    </div>
  );
};

export default Layout;
