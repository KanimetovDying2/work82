import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosApi from "../api/axiosApi";
import type { Album, Artist, Track } from "../types";
import Spinner from "../components/Spinner";

const TracksPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  if (loading) {
    return <Spinner />;
  }

  if (!album) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
          Album not found
        </h2>
        <p className="text-zinc-400 mb-6 text-sm font-mono">
          The album you are looking for does not exist or was removed.
        </p>
        <Link
          to="/"
          className="text-white hover:text-zinc-300 transition-colors inline-flex items-center gap-1 font-mono text-sm underline underline-offset-4"
        >
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  const artist =
    album && typeof album.artist === "object" ? (album.artist as Artist) : null;
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
              album?.photo
                ? `http://localhost:3000/uploads/${album.photo}`
                : "https://via.placeholder.com/300?text=No+Cover"
            }
            alt={album?.name}
            className="w-40 h-40 rounded-xl object-cover border border-zinc-800 shadow-md"
          />
          <div className="text-center sm:text-left flex-1">
            <span className="text-xs uppercase tracking-wider text-zinc-300 font-semibold bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 font-mono">
              Album &bull; {album?.year}
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-3 tracking-tight">
              {album?.name}
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
                </div>
                <span className="text-sm text-zinc-400 font-mono">
                  {track.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TracksPage;
