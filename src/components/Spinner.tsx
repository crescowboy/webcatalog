import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-current border-t-transparent text-purple-600" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
