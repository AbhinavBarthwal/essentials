import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { RefreshCw } from "lucide-react";

const CameraCapture = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [deviceId, setDeviceId] = useState(null);
  const webcamRef = useRef(null);

  // Fetch devices on mount
  useEffect(() => {
    const getDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter((device) => device.kind === "videoinput");

        // Try to pick default rear camera (avoid ultrawide if possible)
        const rearCam = videoInputs.find((d) =>
          /back|rear|environment/i.test(d.label)
        ) || videoInputs[0];

        setVideoDevices(videoInputs);
        setDeviceId(rearCam.deviceId);
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.error("Error getting devices:", err);
        setHasPermission(false);
      }
    };

    getDevices();
  }, []);

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setIsCameraOn(false);
    }
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    if (!isCameraOn) {
      setCapturedImage(null);
    }
  };

  const switchCamera = () => {
    if (videoDevices.length < 2) return;

    const currentIndex = videoDevices.findIndex((d) => d.deviceId === deviceId);
    const nextIndex = (currentIndex + 1) % videoDevices.length;
    setDeviceId(videoDevices[nextIndex].deviceId);
  };

  return (
    <div className="w-full h-[500px] mb-1 bg-black flex flex-col items-center justify-center relative">
      <div className="w-full h-full flex justify-center items-center relative overflow-hidden rounded-lg">
        {isCameraOn ? (
          <div className="relative w-full h-full">
            <Webcam
              key={deviceId}
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{ deviceId }}
              className="w-full h-full object-cover rounded-[20px]"
              forceScreenshotSourceSize={true}
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

export default CameraCapture;
