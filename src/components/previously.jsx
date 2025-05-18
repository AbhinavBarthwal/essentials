import React from 'react';
import PartPreviously from './partpreviously';
const data = [
    { id:1, title:'Weekly Prediction checkup',},
    { id:2, title:'Weekly Prediction checkup'},
];
const Previously = () =>{
    return (
        <div className ="w-full py-2 text-white">
            <h2 className = "text-lg font-semibold mb-3">Previously on Essentials</h2>
            <div className = "flex space-x-10">
            {data.map(item => (
          <PartPreviously key={item.id} image={item.image} title={item.title} />
          ))}
            </div>
        </div>
    );
};
export default Previously;
