import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Camera, CheckCircle, AlertCircle } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

const FaceAuth: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detector, setDetector] = useState<any>(null);
  
  // Load TensorFlow.js and face detection model
  useEffect(() => {
    const loadModels = async () => {
      try {
        await tf.ready();
        const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
        const detectorConfig = {
          runtime: 'tfjs',
          refineLandmarks: true,
        };
        
        const faceDetector = await faceLandmarksDetection.createDetector(
          model, 
          detectorConfig as any
        );
        
        setDetector(faceDetector);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load models:', err);
        setError('Failed to initialize face detection. Please try again later.');
        setIsLoading(false);
      }
    };
    
    loadModels();
  }, []);
  
  const captureAndVerify = async () => {
    if (!webcamRef.current || !detector) return;
    
    try {
      setIsCapturing(true);
      setError(null);
      
      // Get video properties
      const video = webcamRef.current.video;
      if (!video) throw new Error('Video stream not available');
      
      // Detect faces
      const faces = await detector.estimateFaces(video);
      
      if (faces.length === 0) {
        setError('No face detected. Please position your face in the frame.');
        setIsCapturing(false);
        return;
      }
      
      if (faces.length > 1) {
        setError('Multiple faces detected. Please ensure only your face is in the frame.');
        setIsCapturing(false);
        return;
      }
      
      // Start verification process
      setIsCapturing(false);
      setIsVerifying(true);
      
      // Simulate verification process
      setTimeout(() => {
        setIsVerifying(false);
        setIsVerified(true);
        
        // Redirect to dashboard after successful verification
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }, 3000);
      
    } catch (err) {
      console.error('Face verification error:', err);
      setError('An error occurred during face verification. Please try again.');
      setIsCapturing(false);
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Face Verification</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Please position your face in the frame and click the verify button to complete your purchase.
          </p>
        </div>
        
        <div className="relative mb-6">
          <div className={`rounded-xl overflow-hidden ${isLoading ? 'bg-gray-200 animate-pulse' : ''}`}>
            {!isLoading && (
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  facingMode: "user",
                  width: { ideal: 640 },
                  height: { ideal: 480 }
                }}
                className="w-full rounded-xl"
              />
            )}
            
            {isLoading && (
              <div className="w-full h-80 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            )}
            
            {isVerifying && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Verifying your identity...</p>
                </div>
              </div>
            )}
            
            {isVerified && (
              <div className="absolute inset-0 bg-green-500 bg-opacity-80 flex items-center justify-center rounded-xl">
                <div className="text-white text-center">
                  <CheckCircle className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-xl font-bold">Verification Successful!</p>
                  <p>Redirecting to your dashboard...</p>
                </div>
              </div>
            )}
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
        </div>
        
        <button
          onClick={captureAndVerify}
          disabled={isLoading || isCapturing || isVerifying || isVerified}
          className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
            isLoading || isCapturing || isVerifying || isVerified
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isCapturing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              <span>Capturing...</span>
            </>
          ) : (
            <>
              <Camera className="h-5 w-5" />
              <span>Verify Identity</span>
            </>
          )}
        </button>
      </div>
      
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="font-medium text-indigo-800 mb-2">Privacy Information</h3>
        <p className="text-sm text-indigo-700">
          Your face data is processed locally on your device and is not stored on our servers.
          This verification is used only to confirm your identity for this purchase.
        </p>
      </div>
    </div>
  );
};

export default FaceAuth;
