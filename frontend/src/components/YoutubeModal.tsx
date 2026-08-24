import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

const YouTubeModal: React.FC<ModalProps> = ({ isOpen, onClose, videoId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden w-full max-w-3xl shadow-2xl">
        <div className="flex justify-between items-center p-4 border-b border-zinc-900">
          <span className="text-sm font-mono text-zinc-400">Now Playing</span>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white font-mono text-sm px-2 py-1 rounded cursor-pointer"
          >
            Close
          </button>
        </div>
        <div className="relative aspect-video w-full bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default YouTubeModal;
