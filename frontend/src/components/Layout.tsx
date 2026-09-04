import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutUser } from "../store/usersSlice";

const Layout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.users.user);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col selection:bg-white selection:text-black">
      <header className="bg-zinc-950 border-b border-zinc-800 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              className="text-2xl font-light tracking-wide text-white hover:text-zinc-300 transition-colors"
            >
              RequRate
            </Link>
            <span className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase">
              The only place with the raw truth about music.
            </span>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-2 mr-2">
                  <Link
                    to="/artists/add"
                    className="text-xs font-mono text-zinc-400 hover:text-white transition-colors bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800/80"
                  >
                    + Artist
                  </Link>
                  <Link
                    to="/albums/add"
                    className="text-xs font-mono text-zinc-400 hover:text-white transition-colors bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800/80"
                  >
                    + Album
                  </Link>
                  <Link
                    to="/tracks/add"
                    className="text-xs font-mono text-zinc-400 hover:text-white transition-colors bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800/80"
                  >
                    + Track
                  </Link>
                </div>

                <Link
                  to="/track_histories"
                  className="text-sm font-mono text-zinc-300 hover:text-white transition-colors bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800"
                >
                  Track History
                </Link>
                <span className="text-sm text-zinc-400 font-mono">
                  Hello, <strong className="text-white">{user.username}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-mono bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-mono text-zinc-300 hover:text-white transition-colors px-3 py-1.5"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-mono bg-white text-black hover:bg-zinc-200 px-3 py-1.5 rounded-lg transition-colors font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        <Outlet />
      </main>

      <footer className="bg-zinc-950 border-t border-zinc-800 text-center py-4 text-xs font-mono text-zinc-500">
        RequRate &bull; 2026
      </footer>
    </div>
  );
};

export default Layout;
