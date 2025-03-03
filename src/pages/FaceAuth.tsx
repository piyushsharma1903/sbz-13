import './index0.css'
// src/pages/FaceAuth.tsx
import React, { useState, useRef } from 'react';

const FaceAuth: React.FC = () => {
  const [photoData, setPhotoData] = useState<string>('');
  const [cameraVisible, setCameraVisible] = useState(false);
  const [permissionErrorVisible, setPermissionErrorVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setCameraVisible(true);
        };
      }
      setPermissionErrorVisible(false);
    } catch (err) {
      console.error('Camera error:', err);
      setPermissionErrorVisible(true);
    }
  };

  // Capture photo
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      // Stop camera stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      setPhotoData(canvas.toDataURL('image/jpeg'));
      setCameraVisible(false);
    }
  };

  // Retake photo
  const retakePhoto = () => {
    setPhotoData('');
    startCamera();
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!photoData) {
      alert('Please capture your photo first');
      return;
    }
    const formData = {
      name: (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value,
      email: (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
      phone: (e.currentTarget.elements.namedItem('phone') as HTMLInputElement).value,
      photo: photoData.split(',')[1] // Base64 data without header
    };

    console.log('Form data:', formData);
    alert('Registration submitted successfully!');
    e.currentTarget.reset();
    setPhotoData('');
  };

  return (
    <div className="container">
      <h1>Event Registration</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" required />
        </div>

        <div className="camera-section">
          { !cameraVisible && !photoData && (
            <button type="button" onClick={startCamera}>Open Camera</button>
          )}
          { permissionErrorVisible && (
            <div className="permission-error">
              Camera access denied. Please enable camera permissions.
            </div>
          )}
          { cameraVisible && (
            <div id="cameraUI">
              <video className="video-feed" ref={videoRef} style={{ transform: 'scaleX(-1)' }}></video>
              <button type="button" className="capture-btn" onClick={capturePhoto}>Capture Photo</button>
            </div>
          )}
          { photoData && (
            <div className="photo-preview-section">
              <img id="photoPreview" src={photoData} alt="Captured photo" style={{ display: 'block', maxWidth: '300px', margin: '1rem auto' }} />
              <button type="button" className="retake-btn" onClick={retakePhoto}>Retake Photo</button>
            </div>
          )}
        </div>
        <button type="submit">Complete Registration</button>
      </form>
    </div>
  );
};

export default FaceAuth;
