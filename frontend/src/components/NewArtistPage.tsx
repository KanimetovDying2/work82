import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../api/axiosApi";

const NewArtistPage: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    info: "",
    photo: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setState((prev) => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", state.name);
      if (state.info) formData.append("info", state.info);
      if (state.photo) formData.append("photo", state.photo);

      await axiosApi.post("/artists", formData);
      navigate("/");
    } catch (e: any) {
      setError(e.response?.data?.message || "Failed to create artist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 bg-zinc-950 border border-zinc-800 p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-extrabold text-white mb-6">
        Add New Artist
      </h2>
      {error && (
        <div className="mb-4 p-3 bg-red-950/50 border border-red-800 rounded-lg text-red-200 text-sm font-mono">
          {error}
        </div>
      )}
      <form onSubmit={submitFormHandler} className="space-y-5">
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1">
            Name *
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
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1">
            Information / Bio
          </label>
          <textarea
            name="info"
            rows={4}
            value={state.info}
            onChange={inputChangeHandler}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors resize-none"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1">
            Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={fileChangeHandler}
            className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-mono file:bg-zinc-900 file:text-white hover:file:bg-zinc-800 cursor-pointer"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-2.5 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer mt-4 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Artist"}
        </button>
      </form>
    </div>
  );
};

export default NewArtistPage;
