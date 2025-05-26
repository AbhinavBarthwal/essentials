import React from 'react';

const TextInput = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Type something ..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-500 text-white placeholder-white rounded-2xl p-3 focus:outline-none"
    />
  );
};

export default TextInput;
