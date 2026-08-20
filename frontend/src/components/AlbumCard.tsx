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
      className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-indigo-500 transition-all group flex flex-col shadow-lg hover:shadow-indigo-500/10"
    >
      <div className="h-64 w-full overflow-hidden bg-gray-800">
        <img
          src={imageUrl}
          alt={album.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
            {album.name}
          </h3>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between items-center text-sm text-gray-400">
          <span>Release Year</span>
          <span className="font-semibold text-indigo-400">{album.year}</span>
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;
