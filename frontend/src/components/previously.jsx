import React from 'react';
import PartPreviously from './partpreviously';
const data = [
    { id:1, title:'Weekly Prediction checkup',image:"https://i.pinimg.com/736x/ca/ae/2b/caae2b4cb08d6c164fb2a7283c68b2ae.jpg",desc: 'Routine checkup scheduled with the pediatrician. Bring the child’s medical history file and immunization record.',},
    { id:2, title:'Weekly Prediction checkup',image:"https://i.pinimg.com/736x/ca/ae/2b/caae2b4cb08d6c164fb2a7283c68b2ae.jpg",desc: 'Routine checkup scheduled with the pediatrician. Bring the child’s medical history file and immunization record.',},
];
const Previously = () =>{
    return (
        <div className ="w-full py-2 text-white">
            <h2 className = "text-lg font-semibold mb-3">Previously on Essentials</h2>
            <div className = "flex space-x-3">
            {data.map(item => (
          <PartPreviously key={item.id} image={item.image} title={item.title} desc={item.desc}/>
          ))}
            </div>
        </div>
    );
};
export default Previously;
