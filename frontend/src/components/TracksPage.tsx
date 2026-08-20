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
        <h2 className="text-2xl font-bold text-white mb-2">Album not found</h2>
        <p className="text-gray-400 mb-6">
          The album you are looking for does not exist or was removed.
        </p>
        <Link
          to="/"
          className="text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1"
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
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1 mb-4"
        >
          &larr; Back to Albums
        </Link>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-gray-900 border border-gray-800 p-6 rounded-2xl">
          <img
            src={
              album?.photo
                ? `http://localhost:3000/uploads/${album.photo}`
                : "https://via.placeholder.com/300?text=No+Cover"
            }
            alt={album?.name}
            className="w-40 h-40 rounded-xl object-cover border border-gray-700 shadow-md"
          />
          <div className="text-center sm:text-left flex-1">
            <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Album &bull; {album?.year}
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">
              {album?.name}
            </h1>
            {artist && (
              <p className="text-gray-400 text-lg font-medium mt-1">
                Artist: <span className="text-white">{artist.name}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white">Tracks</h2>
      </div>

      {tracks.length === 0 ? (
        <p className="text-gray-400 text-center py-10">
          No tracks found for this album.
        </p>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="divide-y divide-gray-800">
            {tracks.map((track) => (
              <div
                key={track._id}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 font-mono w-6 text-right">
                    {track.number}.
                  </span>
                  <span className="text-white font-medium">{track.name}</span>
                </div>
                <span className="text-sm text-gray-400 font-mono">
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
