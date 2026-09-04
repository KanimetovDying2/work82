import React from "react";
import { Link } from "react-router-dom";
import type { Album, Artist } from "../../types";

interface Props {
  album: Album;
  artist: Artist | null;
}

const AlbumHeader: React.FC<Props> = ({ album, artist }) => {
  const artistId = artist ? artist._id : "";

  return (
    <div className="mb-6">
      <Link
        to={`/artists/${artistId}`}
        className="
          text-sm
          text-zinc-400
          hover:text-white
          transition-colors
          inline-flex
          items-center
          gap-1
          mb-4
          font-mono
        "
      >
        &larr; Back to Albums
      </Link>

      <div
        className="
          flex
          flex-col
          sm:flex-row
          items-center
          sm:items-start
          gap-6
          bg-zinc-950
          border
          border-zinc-800
          p-6
          rounded-2xl
          shadow-lg
        "
      >
        <img
          src={
            album.photo
              ? `http://localhost:3000/uploads/${album.photo}`
              : "https://via.placeholder.com/300?text=No+Cover"
          }
          alt={album.name}
          className="
            w-40
            h-40
            rounded-xl
            object-cover
            border
            border-zinc-800
            shadow-md
          "
        />

        <div className="text-center sm:text-left flex-1">
          <span
            className="
              text-xs
              uppercase
              tracking-wider
              text-zinc-300
              font-semibold
              bg-zinc-900
              px-3
              py-1
              rounded-full
              border
              border-zinc-800
              font-mono
            "
          >
            Album • {album.year}
          </span>

          <h1
            className="
              text-3xl
              font-extrabold
              text-white
              mt-3
              tracking-tight
            "
          >
            {album.name}
          </h1>

          {artist && (
            <p
              className="
                text-zinc-400
                text-base
                font-medium
                mt-1
              "
            >
              Artist:{" "}
              <span className="text-white font-semibold">{artist.name}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumHeader;
