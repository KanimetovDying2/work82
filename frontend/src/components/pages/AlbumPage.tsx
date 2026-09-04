import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosApi from "../../api/axiosApi";
import type { Album, Artist } from "../../types";
import AlbumCard from "../AlbumCard";
import Spinner from "../Spinner";

const AlbumsPage: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axiosApi.get<{ albumsData: Album[] }>(
          `/albums?artist=${artistId}`,
        );
        const albumsData = response.data.albumsData;
        setAlbums(albumsData);

        if (albumsData.length > 0 && typeof albumsData[0].artist === "object") {
          setArtist(albumsData[0].artist as Artist);
        } else {
          const artistRes = await axiosApi.get<{ artistsData: Artist[] }>(
            "/artists",
          );
          const found = artistRes.data.artistsData.find(
            (a) => a._id === artistId,
          );
          if (found) setArtist(found);
        }
      } catch (e) {
        console.error("Failed to fetch albums:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [artistId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/"
          className="text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1 mb-4 font-mono"
        >
          &larr; Back to Artists
        </Link>
        {artist && (
          <div className="flex items-center gap-6 bg-zinc-950 border border-zinc-800 p-6 rounded-2xl shadow-lg">
            {artist.photo && (
              <img
                src={`http://localhost:3000/uploads/${artist.photo}`}
                alt={artist.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-zinc-700"
              />
            )}
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {artist.name}
              </h1>
              <p className="text-zinc-400 text-sm mt-1">{artist.info}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Albums</h2>
        <p className="text-zinc-400 text-xs font-mono mt-0.5">
          Sorted by release year (descending)
        </p>
      </div>

      {albums.length === 0 ? (
        <p className="text-zinc-500 text-center py-10 font-mono">
          No albums found for this artist.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <AlbumCard key={album._id} album={album} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumsPage;
