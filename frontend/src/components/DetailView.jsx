import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const DetailView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { text, time ,im ,desc} = location.state || {};

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col gap-4 relative">
      
<div className="flex items-center gap-4 ">
 
  <button
    onClick={() => navigate(-1)}
    className="p-2 rounded-full"
  >
    <ArrowLeft size={30} />
  </button>

 
  <div className="bg-gray-800 rounded-xl px-4 w-full text-center py-2 text-base italic font-medium">
    <div className="text-white">{text || 'No Title'}</div>
    <hr className="my-1 border-gray-600" />
    <div className="text-gray-400 text-sm">{time}</div>
  </div>
</div>



      <img
        src={im || "https://via.placeholder.com/600x400?text=No+Image+Provided"}
        alt="Scenic View"
        className="w-full h-[64%] object-cover mt-[-2%] rounded-xl "
      />


      {/* Description */}
      <div className="bg-gray-800 text-sm text-gray-300 rounded-xl px-4 py-3 leading-relaxed">
        {desc}
      </div>
    </div>
  );
};

export default DetailView;
