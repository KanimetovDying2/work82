import React, { useEffect, useState } from "react";
import axiosApi from "../api/axiosApi";
import type { Artist } from "../types";
import ArtistCard from "./ArtistCard";
import Spinner from "./Spinner";

const ArtistsPage: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axiosApi.get<{ artistsData: Artist[] }>(
          "/artists",
        );
        setArtists(response.data.artistsData);
      } catch (e) {
        console.error("Failed to fetch artists:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Artists</h1>
        <p className="text-gray-400 mt-1">
          Select an artist to view their albums
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <ArtistCard key={artist._id} artist={artist} />
        ))}
      </div>
    </div>
  );
};

export default ArtistsPage;
