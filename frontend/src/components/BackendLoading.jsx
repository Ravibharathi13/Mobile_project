import React from 'react';

const BackendLoading = ({ message = "Waking up server..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-600 text-center">{message}</p>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Free hosting takes a moment to start. Please wait...
      </p>
    </div>
  );
};

export default BackendLoading;
