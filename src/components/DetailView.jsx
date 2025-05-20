import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Optional: if you're using Lucide icons

const DetailView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { text, time ,im } = location.state || {};

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col gap-4 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-10 p-1 rounded-full bg-gray-700 hover:bg-gray-600"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Title */}
      <div className="bg-gray-800 rounded-xl px-3 py-1.5 text-center text-base italic font-medium mt-10">
        {text || 'No Title'}
        <hr />
        {time}
      </div>

      {/* Scenic Image */}
<img
  src={im || "https://via.placeholder.com/600x400?text=No+Image+Provided"}
  alt="Scenic View"
  className="w-full h-[64%] object-cover"
/>


      {/* Description */}
      <div className="bg-gray-800 text-sm text-gray-300 rounded-xl px-4 py-3 leading-relaxed">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a
        type specimen book.
      </div>
    </div>
  );
};

export default DetailView;
