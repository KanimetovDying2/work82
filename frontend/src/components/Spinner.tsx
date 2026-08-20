import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-24">
      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
