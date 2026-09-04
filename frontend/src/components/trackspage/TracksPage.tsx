import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosApi from "../../api/axiosApi";
import type { Album, Artist, Track } from "../../types";
import Spinner from "../Spinner";
import { useAppSelector } from "../../store/hooks";
import YouTubeModal from "../YoutubeModal";
import AlbumHeader from "./AlbumHeader";
import TrackList from "./TrackList";

const TracksPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();

  const user = useAppSelector((state) => state.users.user);

  const [album, setAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumResponse = await axiosApi.get<{ foundAlbum: Album }>(
          `/albums/${albumId}`,
        );

        const tracksResponse = await axiosApi.get<{ tracksData: Track[] }>(
          `/tracks?album=${albumId}`,
        );

        setAlbum(albumResponse.data.foundAlbum);
        setTracks(tracksResponse.data.tracksData);
      } catch (e) {
        console.error("Failed loading tracks page:", e);
        setAlbum(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [albumId]);

  const handlePlay = async (track: Track) => {
    if (!user) return;

    try {
      setPlayingTrackId(track._id);

      await axiosApi.post("/track_histories", {
        track: track._id,
      });

      if (track.youtubeUrl) {
        const videoId = track.youtubeUrl.match(
          /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?]+)/,
        )?.[1];

        if (videoId) {
          setActiveVideoId(videoId);
        }
      }
    } catch (e) {
      console.error("Play track error:", e);
    } finally {
      setTimeout(() => {
        setPlayingTrackId(null);
      }, 500);
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
      const response = await axiosApi.patch(`/tracks/${id}/togglePublished`);

      setTracks((prev) =>
        prev.map((track) => (track._id === id ? response.data.track : track)),
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
        <h2 className="text-2xl text-white font-bold mb-2">Album not found</h2>

        <Link to="/" className="text-white underline font-mono">
          Back home
        </Link>
      </div>
    );
  }

  const artist =
    typeof album.artist === "object" ? (album.artist as Artist) : null;

  return (
    <div>
      <AlbumHeader album={album} artist={artist} />

      <h2 className="text-2xl font-bold text-white mb-4">Tracks</h2>

      <TrackList
        tracks={tracks}
        user={user}
        playingTrackId={playingTrackId}
        onPlay={handlePlay}
        onDelete={handleDeleteTrack}
        onPublish={handlePublishTrack}
      />

      <YouTubeModal
        isOpen={Boolean(activeVideoId)}
        videoId={activeVideoId || ""}
        onClose={() => setActiveVideoId(null)}
      />
    </div>
  );
};

export default TracksPage;
