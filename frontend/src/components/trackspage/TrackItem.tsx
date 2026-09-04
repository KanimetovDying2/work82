import React from "react";
import type { Track, User } from "../../types";

interface Props {
  track: Track;
  user: User | null;
  playingTrackId: string | null;
  onPlay: (track: Track) => void;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
}

const TrackItem: React.FC<Props> = ({
  track,
  user,
  playingTrackId,
  onPlay,
  onDelete,
  onPublish,
}) => {
  return (
    <div
      className="
        px-6
        py-4
        flex
        items-center
        justify-between
        hover:bg-zinc-900/50
        transition-colors
      "
    >
      <div className="flex items-center gap-4">
        <span className="text-zinc-500 font-mono w-6 text-right">
          {track.number}.
        </span>

        <span className="text-white font-medium">{track.name}</span>

        {!track.isPublished && (
          <span
            className="
              text-xs
              text-red-400
              font-mono
              border
              border-red-400/30
              px-2
              py-1
              rounded
            "
          >
            Unpublished
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-400 font-mono">
          {track.duration}
        </span>

        {user && (
          <button
            onClick={() => onPlay(track)}
            disabled={playingTrackId === track._id}
            className="
              bg-white
              text-black
              text-xs
              font-bold
              px-4
              py-1.5
              rounded-full
              hover:bg-zinc-200
              transition-colors
              cursor-pointer
              disabled:opacity-50
            "
          >
            {playingTrackId === track._id ? "Playing..." : "Play"}
          </button>
        )}

        {user?.role === "admin" && !track.isPublished && (
          <button
            onClick={() => onPublish(track._id)}
            className="
              bg-green-600
              hover:bg-green-700
              text-white
              text-xs
              font-bold
              px-3
              py-1.5
              rounded
            "
          >
            Publish
          </button>
        )}

        {user?.role === "admin" && (
          <button
            onClick={() => onDelete(track._id)}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
              text-xs
              font-bold
              px-3
              py-1.5
              rounded
            "
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default TrackItem;
