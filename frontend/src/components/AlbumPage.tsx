import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosApi from "../api/axiosApi";
import type { Album, Artist } from "../types";
import AlbumCard from "../components/AlbumCard";
import Spinner from "../components/Spinner";

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
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1 mb-4"
        >
          &larr; Back to Artists
        </Link>
        {artist && (
          <div className="flex items-center gap-4 bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            {artist.photo && (
              <img
                src={`http://localhost:3000/uploads/${artist.photo}`}
                alt={artist.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500"
              />
            )}
            <div>
              <h1 className="text-3xl font-extrabold text-white">
                {artist.name}
              </h1>
              <p className="text-gray-400 text-sm mt-1">{artist.info}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Albums</h2>
        <p className="text-gray-400 text-sm">
          Sorted by release year (descending)
        </p>
      </div>

      {albums.length === 0 ? (
        <p className="text-gray-400 text-center py-10">
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
