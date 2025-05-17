import React from 'react';
import PartCollection from './partcollection';
const data = [
  { id: 1, text: 'you have a dinner With Yuri in Soho.', time: 'in 5 hours' },
  { id: 2, text: 'Meeting with the PR team', time: 'in 7 hours' },
  { id: 3, text: 'Laundry pickup', time: 'in 8:30 hours' },
  { id: 4, text: 'Weekly pediatrician checkup', time: 'Tomorrow at 9:30 am' }
];

const Collection = () => {
  return (
    <div className="w-full py-1  text-white">
      <h2 className="text-lg font-bold text-white mb-2">Collection</h2>
      <div className="flex flex-col gap-2">
        {data.map(item => (
          <PartCollection key={item.id} text={item.text} time={item.time} />
        ))}
      </div>
    </div>
  );
};

export default Collection;