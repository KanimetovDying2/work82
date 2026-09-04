import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../api/axiosApi";
import type { Artist, Album } from "../types";

const NewTrackPage: React.FC = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<string>("");

  const [state, setState] = useState({
    name: "",
    album: "",
    duration: "3:30",
    number: 1,
    youtubeUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axiosApi.get<{ artistsData: Artist[] }>(
          "/artists",
        );
        setArtists(response.data.artistsData);
        if (response.data.artistsData.length > 0) {
          setSelectedArtist(response.data.artistsData[0]._id);
        }
      } catch (e) {
        console.error("Failed to load artists", e);
      }
    };
    fetchArtists();
  }, []);

  useEffect(() => {
    if (!selectedArtist) return;

    const fetchAlbumsByArtist = async () => {
      try {
        const response = await axiosApi.get<{ albumsData: Album[] }>(
          `/albums?artist=${selectedArtist}`,
        );
        setAlbums(response.data.albumsData);
        if (response.data.albumsData.length > 0) {
          setState((prev) => ({
            ...prev,
            album: response.data.albumsData[0]._id,
          }));
        } else {
          setState((prev) => ({ ...prev, album: "" }));
        }
      } catch (e) {
        console.error("Failed to load albums", e);
      }
    };
    fetchAlbumsByArtist();
  }, [selectedArtist]);

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!state.album) {
      setError("Please select an album (or create one for this artist first).");
      setLoading(false);
      return;
    }

    try {
      await axiosApi.post("/tracks", {
        name: state.name,
        album: state.album,
        duration: state.duration,
        number: Number(state.number),
        youtubeUrl: state.youtubeUrl || undefined,
      });
      navigate(`/albums/${state.album}`);
    } catch (e: any) {
      setError(e.response?.data?.message || "Failed to create track");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 bg-zinc-950 border border-zinc-800 p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-extrabold text-white mb-6">Add New Track</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-950/50 border border-red-800 rounded-lg text-red-200 text-sm font-mono">
          {error}
        </div>
      )}
      <form onSubmit={submitFormHandler} className="space-y-5">
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1">
            Artist *
          </label>
          <select
            value={selectedArtist}
            onChange={(e) => setSelectedArtist(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
          >
            {artists.map((artist) => (
              <option key={artist._id} value={artist._id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1">
            Album *
          </label>
          <select
            name="album"
            value={state.album}
            onChange={inputChangeHandler}
            required
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
          >
            {albums.length === 0 ? (
              <option value="">No albums available for this artist</option>
            ) : (
              albums.map((album) => (
                <option key={album._id} value={album._id}>
                  {album.name} ({album.year})
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1">
            Track Title *
          </label>
          <input
            type="text"
            name="name"
            required
            value={state.name}
            onChange={inputChangeHandler}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">
              Duration (e.g. 3:45)
            </label>
            <input
              type="text"
              name="duration"
              value={state.duration}
              onChange={inputChangeHandler}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">
              Track Number *
            </label>
            <input
              type="number"
              name="number"
              min={1}
              required
              value={state.number}
              onChange={inputChangeHandler}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1">
            YouTube Video URL
          </label>
          <input
            type="text"
            name="youtubeUrl"
            placeholder="https://www.youtube.com/watch?v=..."
            value={state.youtubeUrl}
            onChange={inputChangeHandler}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading || albums.length === 0}
          className="w-full bg-white text-black font-semibold py-2.5 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer mt-4 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Track"}
        </button>
      </form>
    </div>
  );
};

export default NewTrackPage;
