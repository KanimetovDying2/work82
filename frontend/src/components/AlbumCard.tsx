import React from "react";
import { Link } from "react-router-dom";
import type { Album } from "../types";
import { useAppSelector } from "../store/hooks";
import axiosApi from "../api/axiosApi";

interface Props {
  album: Album;
}

const AlbumCard: React.FC<Props> = ({ album }) => {
  const user = useAppSelector((state) => state.users.user);

  const imageUrl = album.photo
    ? `http://localhost:3000/uploads/${album.photo}`
    : "https://via.placeholder.com/300?text=No+Cover";

  const canDelete =
    user &&
    (user.role === "admin" || (!album.isPublished && album.user === user._id));

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await axiosApi.delete(`/albums/${album._id}`);
      window.location.reload();
    } catch (error) {
      console.error("Delete album failed:", error);
    }
  };

  return (
    <div className="relative">
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
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                {album.name}
              </h3>

              {!album.isPublished && (
                <span className="text-xs text-red-400 font-mono border border-red-400/30 px-2 py-1 rounded">
                  Unpublished
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center text-sm text-zinc-400">
            <span>Release Year</span>

            <span className="font-semibold text-white font-mono">
              {album.year}
            </span>
          </div>
        </div>
      </Link>

      {canDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default AlbumCard;
