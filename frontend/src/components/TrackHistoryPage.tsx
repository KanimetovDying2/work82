import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../api/axiosApi";
import { useAppSelector } from "../store/hooks";
import type { TrackHistoryItem } from "../types";
import Spinner from "./Spinner";

const TrackHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.users.user);

  const [history, setHistory] = useState<TrackHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchHistory = async () => {
      try {
        const response =
          await axiosApi.get<TrackHistoryItem[]>("/track_histories");
        setHistory(response.data);
      } catch (e) {
        console.error("Failed to fetch track history:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, navigate]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Track History
        </h1>
        <p className="text-zinc-400 text-sm font-mono mt-1">
          Your recently played tracks, sorted by latest first.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-400 font-mono">
            You haven't listened to any tracks yet.
          </p>
        </div>
      ) : (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-lg">
          <div className="divide-y divide-zinc-900">
            {history.map((item) => (
              <div
                key={item._id}
                className="px-6 py-4 flex items-center justify-between hover:bg-zinc-900/50 transition-colors"
              >
                <div>
                  <h4 className="text-white font-semibold">
                    {item.track ? item.track.name : "Unknown track"}
                  </h4>
                  <p className="text-sm text-zinc-400">
                    Artist:{" "}
                    <span className="text-zinc-200 font-medium">
                      {item.artist ? item.artist.name : "Unknown artist"}
                    </span>
                  </p>
                </div>
                <span className="text-xs text-zinc-500 font-mono">
                  {new Date(item.datetime).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackHistoryPage;
