import React from "react";



const TodaysBrief = () => {
  return (
    <div className="w-full flex flex-col items-start py-3">
      <h2 className="text-lg font-bold text-white mb-2">Today's Brief</h2>
      <div className="bg-gray-700 text-white p-4 flex items-start flex-col rounded-lg w-full shadow-lg">
        <p className="font-semibold mb-2">Good Morning Dhriti,</p>
        <p className="text-sm flex text-start leading-relaxed">
          Today you have to pickup a present for Charlie, drop trousers at the laundry, and you have a dinner with Yuri in Soho.
        </p>
      </div>

    </div>
    
  );
};

export default TodaysBrief;
