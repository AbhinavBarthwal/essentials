import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { RefreshCw } from "lucide-react";

const CameraCapture = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [deviceId, setDeviceId] = useState(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const webcamRef = useRef(null);

  // Helper: check if device label is front camera
  const checkIfFrontCamera = (label) => {
    return /front|user/i.test(label);
  };

  // Fetch devices on mount
  useEffect(() => {
    const getDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter((device) => device.kind === "videoinput");

        // Try to pick default rear camera first (avoid ultrawide if possible)
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

  // When deviceId changes, update isFrontCamera flag
  useEffect(() => {
    if (!deviceId) return;

    const device = videoDevices.find((d) => d.deviceId === deviceId);
    if (device) {
      setIsFrontCamera(checkIfFrontCamera(device.label));
    }
  }, [deviceId, videoDevices]);

  // Capture image and flip if front camera
  const captureImage = () => {
    if (!webcamRef.current) return;

    const video = webcamRef.current.video;
    if (!video) return;

    // Create canvas with same size as video
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    if (isFrontCamera) {
      // Flip horizontally for front camera
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get high quality JPEG image
    const imageSrc = canvas.toDataURL("image/jpeg", 1.0); // 1.0 = max quality

    setCapturedImage(imageSrc);
    setIsCameraOn(false);
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
              mirrored={false} // manage mirroring ourselves
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
              style={{ transform: "none" }}
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
