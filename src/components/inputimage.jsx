import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Camera, CameraOff, RefreshCw } from "lucide-react";

const CameraCapture = () => {
  const [capturedImage, setCapturedImage] = useState(null);

  //Commenting out camera functionality for now
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [facingMode, setFacingMode] = useState("user");

  useEffect(() => {
    console.log("Camera functionality is currently disabled.");
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
    <div className="w-full h-120 bg-black flex flex-col items-center justify-center">
      <div className="w-full flex justify-center items-center">
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <img src="../src/assets/20240313_094609.jpg"alt="Sample" className="w-full  h-120 object-cover overflow-hidden rounded-lg" />
        )}
        
      </div>
    </div>
  );
};

export default CameraCapture;
