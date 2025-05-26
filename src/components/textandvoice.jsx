import React, { useState } from 'react';
import TextInput from './textinput';
import VoiceRecorder from './voiceinput';

const InputBox = () => {
  const [text, setText] = useState('');

  return (
    <div className="pt-2 bg-black text-white w-full">
      <TextInput value={text} onChange={setText} />

      <div className="flex items-center justify-between w-full">
        <div className="w-4/5">
          <VoiceRecorder />
        </div>
        <button className="w-[18%] mt-2 h-12 bg-blue-500 rounded-full text-white py-1">
          SEND
        </button>
      </div>
    </div>
  );
};

export default InputBox;
