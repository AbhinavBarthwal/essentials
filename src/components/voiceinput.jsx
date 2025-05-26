import React, { useState, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const VoiceRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      chunks.current = [];
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  // New handler for delete
  const deleteRecording = () => {
    setAudioUrl(null);
    setIsPlaying(false);
  };

  return (
    <>
      {!audioUrl ? (
        <button
          onClick={recording ? stopRecording : startRecording}
          className="w-[100%] h-12 bg-red-600 text-white py-3 mt-2 rounded-full text-center"
        >
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
      ) : (
        <div className="w-[100%] h-12 flex items-center justify-between bg-red-600 rounded-full py-3 px-4 mt-2">
          <button onClick={togglePlay} className="text-white text-lg">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button
            onClick={deleteRecording}
            className="text-white bg-red-800 px-3 py-1 rounded-full hover:bg-red-900 transition"
          >
            Delete
          </button>
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        </div>
      )}
    </>
  );
};

export default VoiceRecorder;
