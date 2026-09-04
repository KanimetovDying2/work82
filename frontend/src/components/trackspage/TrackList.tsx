import React from "react";
import type { Track, User } from "../../types";
import TrackItem from "./TrackItem";

interface Props {
  tracks: Track[];
  user: User | null;
  playingTrackId: string | null;
  onPlay: (track: Track) => void;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
}

const TrackList: React.FC<Props> = ({
  tracks,
  user,
  playingTrackId,
  onPlay,
  onDelete,
  onPublish,
}) => {
  if (tracks.length === 0) {
    return (
      <p className="text-zinc-500 text-center py-10 font-mono">
        No tracks found for this album.
      </p>
    );
  }

  return (
    <div
      className="
        bg-zinc-950
        border
        border-zinc-800
        rounded-xl
        overflow-hidden
        shadow-lg
      "
    >
      <div className="divide-y divide-zinc-900">
        {tracks.map((track) => (
          <TrackItem
            key={track._id}
            track={track}
            user={user}
            playingTrackId={playingTrackId}
            onPlay={onPlay}
            onDelete={onDelete}
            onPublish={onPublish}
          />
        ))}
      </div>
    </div>
  );
};

export default TrackList;
