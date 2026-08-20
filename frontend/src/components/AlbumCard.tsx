import React from "react";
import { Link } from "react-router-dom";
import type { Album } from "../types";

interface Props {
  album: Album;
}

const AlbumCard: React.FC<Props> = ({ album }) => {
  const imageUrl = album.photo
    ? `http://localhost:3000/uploads/${album.photo}`
    : "https://via.placeholder.com/300?text=No+Cover";

  return (
    <Link
      to={`/albums/${album._id}`}
      className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden hover:border-white transition-all group flex flex-col shadow-lg hover:shadow-white/5"
    >
      <div className="h-64 w-full overflow-hidden bg-zinc-900">
        <img
          src={imageUrl}
          alt={album.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 grayscale group-hover:grayscale-0"
        />
      </div>
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
            {album.name}
          </h3>
        </div>
        <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center text-sm text-zinc-400">
          <span>Release Year</span>
          <span className="font-semibold text-white font-mono">
            {album.year}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;
