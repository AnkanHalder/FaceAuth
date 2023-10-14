import React from 'react';

const Loading = ({ text, ...props }) => {
  if (!text) {
    text = 'Loading';
  }
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black">
      <div className="text-white text-3xl font-bold">
        {text}<span className="animate-ping">...</span>
      </div>
      <div className="h-20 w-20 mx-4">
        <div className="border-t-4 border-blue-500 rounded-full animate-spin h-full w-full"></div>
      </div>
    </div>
  );
};

export default Loading;
