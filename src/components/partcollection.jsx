import React from 'react';

const PartCollection = ({ text, time }) => {
  return (
    <div className="flex items-center p-2 bg-gray-700 rounded-lg">
      <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
      <div className="flex flex-col">
        <span className="text-white text-sm">{text}</span>
        <span className="text-gray-400 text-xs">{time}</span>
      </div>
    </div>
    
  );
};

export default PartCollection;
