import React from 'react';
import { useNavigate } from 'react-router-dom';

const PartPreviously = ({ image, title ,desc}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/detail', {
      state: {
        text: title,
        time: "Previously", 
        im: image,
        desc:desc
      }
    });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-md w-[60%] cursor-pointer hover:shadow-lg transition"
    >
      <img src={image} alt={title} className="w-full h-24 object-cover" />
      <div className="p-2 flex justify-between items-center bg-gray-700">
        <span className="text-white text-xs">{title}</span>
        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default PartPreviously;
