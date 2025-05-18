import React from 'react';
const PartPreviously=({image,title}) =>{
    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-md w-[57%]">
            <img src={image} alt={title} className="w-full h-24 object-cover" />
            <div className="p-2 flex justify-between items-center bg-gray-700">
                <span className="text-white text-xs">{title}</span>
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            </div>
        </div>
    );
};
export default PartPreviously;