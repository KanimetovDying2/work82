import React from "react";
import { Link } from "react-router-dom";
import type { Artist } from "../types";

interface Props {
  artist: Artist;
}

const ArtistCard: React.FC<Props> = ({ artist }) => {
  const imageUrl = artist.photo
    ? `http://localhost:3000/uploads/${artist.photo}`
    : "https://via.placeholder.com/300?text=No+Photo";

  return (
    <Link
      to={`/artists/${artist._id}`}
      className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-indigo-500 transition-all group flex flex-col shadow-lg hover:shadow-indigo-500/10"
    >
      <div className="h-64 w-full overflow-hidden bg-gray-800">
        <img
          src={imageUrl}
          alt={artist.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
          {artist.name}
        </h3>
        <p className="text-sm text-gray-400 mt-2 line-clamp-2">
          {artist.info || "No description available."}
        </p>
      </div>
    </Link>
  );
};

export default ArtistCard;
