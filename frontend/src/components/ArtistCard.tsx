import React from "react";
import { Link } from "react-router-dom";
import type { Artist } from "../types";
import { useAppSelector } from "../store/hooks";
import axiosApi from "../api/axiosApi";

interface Props {
  artist: Artist;
}

const ArtistCard: React.FC<Props> = ({ artist }) => {
  const user = useAppSelector((state) => state.users.user);

  const imageUrl = artist.photo
    ? `http://localhost:3000/uploads/${artist.photo}`
    : "https://via.placeholder.com/300?text=No+Photo";

  const canDelete =
    user &&
    (user.role === "admin" ||
      (!artist.isPublished && artist.user === user._id));

  const canPublish = user?.role === "admin" && !artist.isPublished;

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await axiosApi.delete(`/artists/${artist._id}`);
      window.location.reload();
    } catch (error) {
      console.error("Delete artist failed:", error);
    }
  };

  const handlePublish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await axiosApi.patch(`/artists/${artist._id}/togglePublished`);
      window.location.reload();
    } catch (error) {
      console.error("Publish artist failed:", error);
    }
  };

  return (
    <div className="relative">
      <Link
        to={`/artists/${artist._id}`}
        className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden hover:border-white transition-all group flex flex-col shadow-lg hover:shadow-white/5"
      >
        <div className="h-64 w-full overflow-hidden bg-zinc-900">
          <img
            src={imageUrl}
            alt={artist.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
              {artist.name}
            </h3>

            {!artist.isPublished && (
              <span className="text-xs text-red-400 font-mono border border-red-400/30 px-2 py-1 rounded">
                Unpublished
              </span>
            )}
          </div>

          <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
            {artist.info || "No description available."}
          </p>
        </div>
      </Link>

      <div className="absolute top-3 right-3 flex gap-2">
        {canPublish && (
          <button
            onClick={handlePublish}
            className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded"
          >
            Publish
          </button>
        )}

        {canDelete && (
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ArtistCard;
