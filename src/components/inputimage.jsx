import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Camera, CameraOff, RefreshCw } from "lucide-react";

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [facingMode, setFacingMode] = useState("user");

  useEffect(() => {
    async function requestCameraAccess() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (stream) {
          setIsCameraOn(true);
        }
      } catch (error) {
        console.log("Camera access denied or not available.", error);
        setIsCameraOn(false);
      }
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      requestCameraAccess();
    } else {
      console.log("Camera API not supported in this browser.");
    }
  }, []);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setIsCameraOn(false);
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    setCapturedImage(null);
  };

  const switchCamera = () => {
    setFacingMode(facingMode === "user" ? "environment" : "user");
  };

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center">
      {isCameraOn ? (
        <div className="relative w-full h-3/5 flex justify-center items-center">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            height="100%"
            videoConstraints={{ facingMode }}
            className="rounded-lg object-cover"
          />
          <div className="absolute top-4 left-4">
            <button onClick={toggleCamera} className="text-white">
              <CameraOff size={24} />
            </button>
          </div>
          <div className="absolute top-4 right-4">
            <button onClick={switchCamera} className="text-white">
              <RefreshCw size={24} />
            </button>
          </div>
          <div className="absolute bottom-4">
            <button
              onClick={captureImage}
              className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center"
            >
              <Camera size={24} className="text-white" />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-3/5 flex justify-center items-center">
          {capturedImage ? (
            <img src={capturedImage} alt="Captured" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <p className="text-white">No Image Captured</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
