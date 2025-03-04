import { useState, useRef, useEffect } from 'react';

export default function Registration() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Camera functionality
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      alert('Error accessing camera: ' + (err as Error).message);
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      setCapturedImage(canvas.toDataURL('image/jpeg'));
      stream?.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [stream]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!capturedImage) {
      alert('Please capture your photo first');
      return;
    }
    console.log('Registration Data:', { ...formData, photo: capturedImage });
    alert('Registration submitted!');
  };

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Event Registration</h1>
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-sm">
        {/* Form fields */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Full Name</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Add similar blocks for email and phone */}

        {/* Camera section */}
        <div className="my-6 text-center">
          {!capturedImage ? (
            <>
              <button
                type="button"
                onClick={startCamera}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Open Camera
              </button>
              
              {stream && (
                <div className="mt-4">
                  <video ref={videoRef} autoPlay className="mx-auto max-w-full rounded-lg transform scale-x-[-1]"/>
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
                  >
                    Capture Photo
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="mt-4">
              <img src={capturedImage} alt="Preview" className="mx-auto max-w-48 rounded-lg"/>
              <button
                type="button"
                onClick={() => setCapturedImage(null)}
                className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700"
              >
                Retake Photo
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Complete Registration
        </button>
      </form>
    </div>
  );
}
