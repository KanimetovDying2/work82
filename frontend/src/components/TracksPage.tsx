import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosApi from "../api/axiosApi";
import type { Album, Artist, Track } from "../types";
import Spinner from "../components/Spinner";
import { useAppSelector } from "../store/hooks";
import YouTubeModal from "./YoutubeModal";

const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

const TracksPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();

  const user = useAppSelector((state) => state.users.user);

  const [album, setAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const albumResponse = await axiosApi.get<{ foundAlbum: Album }>(
          `/albums/${albumId}`,
        );

        setAlbum(albumResponse.data.foundAlbum);

        const tracksResponse = await axiosApi.get<{ tracksData: Track[] }>(
          `/tracks?album=${albumId}`,
        );

        setTracks(tracksResponse.data.tracksData);
      } catch (e) {
        console.error("Failed to fetch album details:", e);
        setAlbum(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [albumId]);

  const handlePlay = async (track: Track) => {
    if (!user) return;

    try {
      setPlayingTrackId(track._id);

      await axiosApi.post("/track_histories", {
        track: track._id,
      });
    } catch (e) {
      console.error("Failed to add track to history:", e);
    } finally {
      setTimeout(() => {
        setPlayingTrackId(null);
      }, 500);
    }

    if (track.youtubeUrl) {
      const videoId = getYouTubeVideoId(track.youtubeUrl);

      if (videoId) {
        setActiveVideoId(videoId);
      }
    }
  };

  const handleDeleteTrack = async (id: string) => {
    if (!window.confirm("Delete this track?")) return;

    try {
      await axiosApi.delete(`/tracks/${id}`);

      setTracks((prev) => prev.filter((track) => track._id !== id));
    } catch (e) {
      console.error("Delete track failed:", e);
    }
  };

  const handlePublishTrack = async (id: string) => {
    try {
      await axiosApi.patch(`/tracks/${id}/togglePublished`);

      setTracks((prev) =>
        prev.map((track) =>
          track._id === id ? { ...track, isPublished: true } : track,
        ),
      );
    } catch (e) {
      console.error("Publish track failed:", e);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!album) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-2">Album not found</h2>

        <Link to="/" className="text-white underline font-mono text-sm">
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  const artist =
    typeof album.artist === "object" ? (album.artist as Artist) : null;

  const artistId = artist ? artist._id : "";

  return (
    <div>
      <div className="mb-6">
        <Link
          to={`/artists/${artistId}`}
          className="text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1 mb-4 font-mono"
        >
          &larr; Back to Albums
        </Link>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-zinc-950 border border-zinc-800 p-6 rounded-2xl shadow-lg">
          <img
            src={
              album.photo
                ? `http://localhost:3000/uploads/${album.photo}`
                : "https://via.placeholder.com/300?text=No+Cover"
            }
            alt={album.name}
            className="w-40 h-40 rounded-xl object-cover border border-zinc-800 shadow-md"
          />

          <div className="text-center sm:text-left flex-1">
            <span className="text-xs uppercase tracking-wider text-zinc-300 font-semibold bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 font-mono">
              Album • {album.year}
            </span>

            <h1 className="text-3xl font-extrabold text-white mt-3 tracking-tight">
              {album.name}
            </h1>

            {artist && (
              <p className="text-zinc-400 text-base font-medium mt-1">
                Artist:{" "}
                <span className="text-white font-semibold">{artist.name}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">Tracks</h2>
      </div>

      {tracks.length === 0 ? (
        <p className="text-zinc-500 text-center py-10 font-mono">
          No tracks found for this album.
        </p>
      ) : (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-lg">
          <div className="divide-y divide-zinc-900">
            {tracks.map((track) => (
              <div
                key={track._id}
                className="px-6 py-4 flex items-center justify-between hover:bg-zinc-900/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-zinc-500 font-mono w-6 text-right">
                    {track.number}.
                  </span>

                  <span className="text-white font-medium">{track.name}</span>

                  {!track.isPublished && (
                    <span className="text-xs text-red-400 font-mono border border-red-400/30 px-2 py-1 rounded">
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
                      onClick={() => handlePlay(track)}
                      disabled={playingTrackId === track._id}
                      className="bg-white text-black text-xs font-bold px-4 py-1.5 rounded-full hover:bg-zinc-200 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {playingTrackId === track._id ? "Playing..." : "Play"}
                    </button>
                  )}

                  {user?.role === "admin" && !track.isPublished && (
                    <button
                      onClick={() => handlePublishTrack(track._id)}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded"
                    >
                      Publish
                    </button>
                  )}

                  {user?.role === "admin" && (
                    <button
                      onClick={() => handleDeleteTrack(track._id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <YouTubeModal
        isOpen={Boolean(activeVideoId)}
        onClose={() => setActiveVideoId(null)}
        videoId={activeVideoId || ""}
      />
    </div>
  );
};

export default TracksPage;
