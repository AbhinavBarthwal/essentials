import React, { useState } from 'react';
import TextInput from './textinput';
import VoiceRecorder from './voiceinput';

const InputBox = () => {
  const [text, setText] = useState('');

  return (
    <div className="p-4 bg-black text-white w-full">
      <TextInput value={text} onChange={setText} />

      <div className="flex items-center mt-4 w-full">
        <div className="w-4/5">
          <VoiceRecorder />
        </div>
        <button className="w-1/5 ml-2 bg-blue-500 rounded-full text-white py-3">
          SEND
        </button>
      </div>
    </div>
  );
};

export default InputBox;
