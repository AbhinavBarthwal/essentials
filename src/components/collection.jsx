import React from 'react';
import PartCollection from './partcollection';
const defaultImg = "https://i.pinimg.com/736x/ca/ae/2b/caae2b4cb08d6c164fb2a7283c68b2ae.jpg";

const data = [
  {
    id: 1,
    text: 'You have a dinner With Yuri in Soho.',
    time: 'in 5 hours',
    im: defaultImg,
    desc: 'Enjoy an evening dinner with Yuri at a popular restaurant in Soho. Make sure to arrive on time and wear something formal.',
  },
  {
    id: 2,
    text: 'Meeting with the PR team',
    time: 'in 7 hours',
    im: defaultImg,
    desc: 'A crucial PR meeting to finalize the upcoming campaign strategy. Prepare the presentation and gather all engagement metrics.',
  },
  {
    id: 3,
    text: 'Laundry pickup',
    time: 'in 8:30 hours',
    im: defaultImg,
    desc: 'Pick up your laundry from the service center. Don’t forget to check for any missing items or special care instructions.',
  },
  {
    id: 4,
    text: 'Weekly pediatrician checkup',
    time: 'Tomorrow at 9:30 am',
    im: defaultImg,
    desc: 'Routine checkup scheduled with the pediatrician. Bring the child’s medical history file and immunization record.',
  }
];



const Collection = () => {
  return (
    <div className="w-full py-1  text-white">
      <h2 className="text-lg font-bold text-white mb-2">Collection</h2>
      <div className="flex flex-col gap-2">
        {data.map(item => (
          <PartCollection key={item.id} text={item.text} time={item.time} im={item.im} desc={item.desc} />
        ))}
      </div>
    </div>
  );
};

export default Collection;