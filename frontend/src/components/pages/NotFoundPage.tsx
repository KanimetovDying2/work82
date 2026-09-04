import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h1 className="text-6xl font-ext500 font-mono text-white mb-2">404</h1>
      <p className="text-zinc-400 font-mono text-sm mb-6">
        This track or page doesn't exist in our database.
      </p>
      <Link
        to="/"
        className="bg-white text-black font-semibold px-5 py-2.5 rounded-lg hover:bg-zinc-200 transition-colors font-mono text-sm"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
