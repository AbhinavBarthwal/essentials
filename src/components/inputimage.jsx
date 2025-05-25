import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Camera, CameraOff, RefreshCw } from "lucide-react";

const CameraCapture = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [facingMode, setFacingMode] = useState("user");
  const [hasPermission, setHasPermission] = useState(null);

  // Check camera permissions and handle errors
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

  // Request camera access function for mobile
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
    <div className="w-full h-[600px] bg-black flex flex-col items-center justify-center relative">
      <div className="w-full h-full flex justify-center items-center relative">
        {isCameraOn ? (
          <div className="w-full h-full">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode }}
              className="w-full h-full object-cover"
              forceScreenshotSourceSize={true}
            />
          </div>
        ) : capturedImage ? (
          <img 
            src={capturedImage} 
            alt="Captured" 
            className="w-full h-full object-cover rounded-lg" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <div className="text-white text-center p-4">
              <p>Click the camera button to start</p>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
        {isCameraOn ? (
          <>
            <button
              onClick={captureImage}
              className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-200 transition"
            >
              <Camera className="text-black" size={24} />
            </button>
            <button
              onClick={switchCamera}
              className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-200 transition"
            >
              <RefreshCw className="text-black" size={24} />
            </button>
          </>
        ) : (
          <button
            onClick={hasPermission === false ? requestCameraAccess : toggleCamera}
            className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-200 transition"
          >
            {hasPermission === false ? (
              <span className="text-black text-sm">Enable Camera</span>
            ) : (
              <Camera className="text-black" size={24} />
            )}
          </button>
        )}
        
        {capturedImage && !isCameraOn && (
          <button
            onClick={toggleCamera}
            className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-200 transition"
          >
            <CameraOff className="text-black" size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;