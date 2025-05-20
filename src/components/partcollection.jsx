import React from 'react';
import { useNavigate } from 'react-router-dom';

const PartCollection = ({ text, time,im }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/detail', {
      state: { text, time,im}, // passing data to DetailView
    });
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center p-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition"
    >
      <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
      <div className="flex flex-col">
        <span className="text-white text-sm">{text}</span>
        <span className="text-gray-400 text-xs">{time}</span>
      </div>
    </div>
  );
};

export default PartCollection;
