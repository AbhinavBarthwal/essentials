import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { RefreshCw } from "lucide-react";
import { FaPlay, FaPause } from "react-icons/fa";

function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while(n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, {type:mime});
}

async function urlToFile(url, filename, mimeType) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  return new File([buffer], filename, { type: mimeType });
}

const TextInput = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Type something ..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full bg-gray-500 text-white placeholder-white rounded-2xl p-3 focus:outline-none"
  />
);

// === Voice Recorder ===
const VoiceRecorder = ({ audioUrl, setAudioUrl }) => {
  const [recording, setRecording] = useState(false);
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

  const deleteRecording = () => {
    setAudioUrl(null);
    setIsPlaying(false);
  };

  return (
    <>
      {!audioUrl ? (
        <button
          onClick={recording ? stopRecording : startRecording}
          className="w-full h-12 bg-red-600 text-white py-3 mt-2 rounded-2xl text-center"
        >
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
      ) : (
        <div className="w-full h-12 flex items-center justify-between bg-red-600 rounded-2xl py-3 px-4 mt-2">
          <button onClick={togglePlay} className="text-white text-lg">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button
            onClick={deleteRecording}
            className="text-white bg-red-800 px-3 py-1 rounded-2xl hover:bg-red-900 transition"
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

// === Camera Capture ===
const CameraCapture = ({ capturedImage, setCapturedImage }) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [deviceId, setDeviceId] = useState(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const webcamRef = useRef(null);

  const checkIfFrontCamera = (label) => /front|user/i.test(label);

  useEffect(() => {
    const getDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter((d) => d.kind === "videoinput");
        const rearCam = videoInputs.find((d) =>
          /back|rear|environment/i.test(d.label)
        ) || videoInputs[0];
        setVideoDevices(videoInputs);
        setDeviceId(rearCam.deviceId);
        setIsFrontCamera(checkIfFrontCamera(rearCam.label));
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.error("Error getting devices:", err);
        setHasPermission(false);
      }
    };
    getDevices();
  }, []);

  useEffect(() => {
    if (!deviceId) return;
    const device = videoDevices.find((d) => d.deviceId === deviceId);
    if (device) {
      setIsFrontCamera(checkIfFrontCamera(device.label));
    }
  }, [deviceId, videoDevices]);

  const captureImage = () => {
    if (!webcamRef.current) return;
    const video = webcamRef.current.video;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    if (isFrontCamera) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageSrc = canvas.toDataURL("image/jpeg", 1.0);
    setCapturedImage(imageSrc);
    setIsCameraOn(false);
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    if (!isCameraOn) setCapturedImage(null);
  };

  const switchCamera = () => {
    if (videoDevices.length < 2) return;
    const currentIndex = videoDevices.findIndex((d) => d.deviceId === deviceId);
    const nextIndex = (currentIndex + 1) % videoDevices.length;
    setDeviceId(videoDevices[nextIndex].deviceId);
  };

  return (
    <div className="w-full h-130 mb-1 bg-black flex flex-col items-center justify-center relative">
      <div className="w-full h-full flex justify-center items-center relative overflow-hidden rounded-lg">
        {isCameraOn ? (
          <div className="relative w-full h-full">
            <Webcam
              key={deviceId}
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{ deviceId }}
              className={`w-full h-full object-cover rounded-[20px] ${isFrontCamera ? "scale-x-[-1]" : ""}`}
              forceScreenshotSourceSize={true}
              mirrored={false}
            />
            <button
              onClick={switchCamera}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full p-2 flex items-center shadow-md"
              title="Switch Camera"
            >
              <RefreshCw className="text-black" size={24} />
            </button>
          </div>
        ) : capturedImage ? (
          <div className="relative w-full h-full">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={toggleCamera}
              className="absolute top-4 left-4 bg-white text-black rounded-full px-4 py-2 text-sm shadow-md hover:bg-gray-200 transition"
            >
              Retake
            </button>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <button
              onClick={() => setIsCameraOn(true)}
              className="bg-white text-black px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition"
            >
              Start Camera
            </button>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
        {isCameraOn && (
          <button
            onClick={captureImage}
            className="bg-red-600 border-4 border-white w-20 h-20 rounded-full shadow-lg hover:bg-red-700 transition flex items-center justify-center"
          />
        )}
      </div>
    </div>
  );
};

// === Master Input Component ===
const UnifiedInputPage = () => {
  const [text, setText] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  // Moved handleSend inside component so it can access states
  const handleSend = async () => {
    const formData = new FormData();

    if (text) formData.append('text', text);

    if (capturedImage) {
      const imageFile = dataURLtoFile(capturedImage, 'capture.jpg');
      formData.append('image', imageFile);
    }

    if (audioUrl) {
      const audioFile = await urlToFile(audioUrl, 'audio.webm', 'audio/webm');
      formData.append('audio', audioFile);
    }

    try {
      const response = await fetch("https://fastapi-backend-871774781948.us-central1.run.app/process/", {
  method: "POST",
  body: formData
});

      const result = await response.json();
      console.log("Response from backend:", result);
      alert("Data processed successfully!");
    } catch (err) {
      console.error(err);
      alert("Error sending data to backend");
    }
  };

  return (
    <div className="pt-1 bg-black text-white w-full max-w-md mx-auto">
      <CameraCapture capturedImage={capturedImage} setCapturedImage={setCapturedImage} />
      <TextInput value={text} onChange={setText} />
      <div className="flex items-center justify-between w-full">
        <div className="w-4/5">
          <VoiceRecorder audioUrl={audioUrl} setAudioUrl={setAudioUrl} />
        </div>
        <button
          onClick={handleSend}
          className="mt-4 ml-2 w-1/5 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white"
          disabled={!text && !capturedImage && !audioUrl}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UnifiedInputPage;
