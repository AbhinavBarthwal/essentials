import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Camera, CameraOff, RefreshCw, RotateCw } from "lucide-react";

const CameraCapture = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [facingMode, setFacingMode] = useState("user");
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        setHasPermission(true);
      } catch (err) {
        console.error("Camera access error:", err);
        setHasPermission(false);
      }
    };

    if (isCameraOn) {
      checkPermissions();
    }
  }, [isCameraOn]);

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
    setFacingMode(facingMode === "user" ? "environment" : "user");
  };

  const requestCameraAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setHasPermission(true);
      setIsCameraOn(true);
    } catch (err) {
      console.error("Failed to get camera access:", err);
      setHasPermission(false);
      alert("Camera access was denied. Please enable camera permissions in your browser settings.");
    }
  };

  return (
    <div className="w-full h-[500px] mb-1 bg-black flex flex-col items-center justify-center relative">
      <div className="w-full h-full flex justify-center items-center relative overflow-hidden rounded-lg">

        {isCameraOn ? (
          <div className="relative w-full h-full">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode }}
          className="w-full h-full object-cover rounded-[20px]"
          forceScreenshotSourceSize={true}
        />
        <button
          onClick={switchCamera}
          className="absolute top-4 right-4 w-10 h-10  bg-white rounded-full p-2 flex items-center flex-row shadow-md"
        >
          <RefreshCw className="text-black" size={40}  />
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
              onClick={hasPermission === false ? requestCameraAccess : toggleCamera}
              className="bg-white text-black px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition"
            >
              Start Camera
            </button>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
        {isCameraOn && (
          <>
            <button
              onClick={captureImage}
              className="bg-red-600 border-4 border-white w-20 h-20 rounded-full shadow-lg hover:bg-red-700 transition flex items-center justify-center"
            >
              
            </button>

          </>
        )}


      </div>
    </div>
  );
};

export default CameraCapture;
