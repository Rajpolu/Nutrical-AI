
import React, { useRef, useEffect, useState } from 'react';
import { Camera, AlertCircle } from 'lucide-react';
import { Exercise } from '../types/workout';

interface WorkoutCameraProps {
  exercise: Exercise;
  isActive: boolean;
  onRepCount: () => void;
  onTimeUpdate: (time: number) => void;
}

const WorkoutCamera: React.FC<WorkoutCameraProps> = ({
  exercise,
  isActive,
  onRepCount,
  onTimeUpdate
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [repCount, setRepCount] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    initializeCamera();
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      startTimer();
      startPoseDetection();
    } else {
      stopTimer();
    }
  }, [isActive]);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: 1280, 
          height: 720,
          facingMode: 'user'
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsCameraReady(true);
          setError(null);
        };
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerRef.current = window.setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        onTimeUpdate(elapsed);
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startPoseDetection = () => {
    // Simulate pose detection and rep counting
    const detectionInterval = setInterval(() => {
      if (isActive && Math.random() > 0.7) { // Simulate detection
        setRepCount(prev => {
          const newCount = prev + 1;
          onRepCount();
          return newCount;
        });
        drawPoseOverlay();
      }
    }, 2000);

    return () => clearInterval(detectionInterval);
  };

  const drawPoseOverlay = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Simulate pose keypoints
    const keypoints = [
      { x: canvas.width * 0.5, y: canvas.height * 0.2 }, // Head
      { x: canvas.width * 0.45, y: canvas.height * 0.35 }, // Left shoulder
      { x: canvas.width * 0.55, y: canvas.height * 0.35 }, // Right shoulder
      { x: canvas.width * 0.4, y: canvas.height * 0.55 }, // Left elbow
      { x: canvas.width * 0.6, y: canvas.height * 0.55 }, // Right elbow
      { x: canvas.width * 0.48, y: canvas.height * 0.65 }, // Left hip
      { x: canvas.width * 0.52, y: canvas.height * 0.65 }, // Right hip
      { x: canvas.width * 0.46, y: canvas.height * 0.85 }, // Left knee
      { x: canvas.width * 0.54, y: canvas.height * 0.85 }, // Right knee
    ];

    // Draw pose keypoints
    keypoints.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = '#00ff88';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw pose connections
    const connections = [
      [0, 1], [0, 2], [1, 2], [1, 3], [2, 4], // Upper body
      [1, 5], [2, 6], [5, 6], [5, 7], [6, 8] // Lower body
    ];

    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 3;
    connections.forEach(([start, end]) => {
      ctx.beginPath();
      ctx.moveTo(keypoints[start].x, keypoints[start].y);
      ctx.lineTo(keypoints[end].x, keypoints[end].y);
      ctx.stroke();
    });
  };

  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
        <div className="flex items-center justify-center space-x-3 text-red-400">
          <AlertCircle className="w-8 h-8" />
          <span className="text-lg font-medium">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ transform: 'scaleX(-1)' }}
        />
        
        {!isCameraReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="flex items-center space-x-3 text-white">
              <Camera className="w-8 h-8 animate-pulse" />
              <span className="text-lg font-medium">Initializing camera...</span>
            </div>
          </div>
        )}
        
        {/* Exercise Info Overlay */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{exercise.icon}</div>
            <div>
              <h3 className="text-white font-bold text-lg">{exercise.name}</h3>
              <p className="text-gray-300 text-sm">
                {isActive ? 'Workout Active' : 'Ready to Start'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Rep Counter Overlay */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-white">{repCount}</div>
          <div className="text-green-100 text-sm font-medium">REPS</div>
        </div>
        
        {/* Detection Status */}
        {isActive && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/70 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">AI Detection Active</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutCamera;
