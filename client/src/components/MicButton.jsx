import { Mic, Square } from "lucide-react";
import { useState, useCallback, useRef, useEffect } from "react";
import brainAuraVideo from "../assets/video/brain-aura.mp4";

export function MicButton({ onRecordingChange, className = "" }) {
  const [isRecording, setIsRecording] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const videoRef = useRef(null);

  const handleClick = useCallback(() => {
    // Handle video playback if autoplay was blocked
    const video = videoRef.current;
    if (video && video.paused && !videoError) {
      video.play().then(() => {
        // Successfully started playing, reset autoplay blocked state
        setAutoplayBlocked(false);
      }).catch(() => {
        // Play failed - this is an autoplay restriction, not a video error
        setAutoplayBlocked(true);
      });
    }

    const newRecordingState = !isRecording;
    setIsRecording(newRecordingState);
    onRecordingChange?.(newRecordingState);
  }, [isRecording, onRecordingChange, videoError]);

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
    setVideoError(false);
    setAutoplayBlocked(false);
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoError(true);
    setVideoLoaded(false);
  }, []);

  // Ensure video plays when component mounts or when video loads
  useEffect(() => {
    const video = videoRef.current;
    if (video && videoLoaded && !videoError) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Successfully auto-playing
          setAutoplayBlocked(false);
        }).catch(() => {
          // Auto-play was prevented, set autoplay blocked (not video error)
          setAutoplayBlocked(true);
        });
      }
    }
  }, [videoLoaded, videoError]);

  return (
    <div className={`relative mx-auto w-64 h-64 ${className}`}>
      {/* Particle Effects Container */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="particle absolute w-2 h-2 bg-blue-400 rounded-full" style={{top: "20%", left: "30%", animationDelay: "0s"}} />
        <div className="particle absolute w-3 h-3 bg-green-400 rounded-full" style={{top: "60%", left: "70%", animationDelay: "1s"}} />
        <div className="particle absolute w-1 h-1 bg-purple-400 rounded-full" style={{top: "80%", left: "20%", animationDelay: "2s"}} />
        <div className="particle absolute w-2 h-2 bg-pink-400 rounded-full" style={{top: "40%", left: "80%", animationDelay: "0.5s"}} />
      </div>
      
      {/* Main Mic Button */}
      <button 
        className={`relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 transition-all duration-500 hover:scale-105 ${
          isRecording 
            ? "recording-pulse" 
            : "pulse-glow breathing"
        }`}
        onClick={handleClick}
        data-testid="mic-button"
      >
        {/* Video Background - Keep mounted even if autoplay is blocked */}
        {!videoError && (
          <video
            ref={videoRef}
            src={brainAuraVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover video-circular-mask"
            onCanPlay={handleVideoLoad}
            onError={handleVideoError}
            data-testid="brain-aura-video"
            preload="metadata"
          />
        )}
        
        {/* Fallback Background Animation (when video fails or is loading) */}
        {(videoError || !videoLoaded) && (
          <div className={`absolute inset-0 ${
            isRecording 
              ? "bg-gradient-to-br from-red-600 via-orange-600 to-red-600" 
              : "bg-gradient-to-br from-blue-600 via-purple-600 to-green-600"
          }`} />
        )}
        
        {/* Loading state animation */}
        {!videoLoaded && !videoError && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-green-500/30 gradient-animate" />
        )}

        {/* Recording State Overlay */}
        {isRecording && videoLoaded && !videoError && (
          <div className="absolute inset-0 bg-red-600/40 mix-blend-multiply" />
        )}
        
        {/* Idle State Overlay */}
        {!isRecording && videoLoaded && !videoError && (
          <div className="absolute inset-0 bg-green-500/20 mix-blend-screen" />
        )}
        
        {/* Tap to Animate Overlay (when autoplay is blocked) */}
        {autoplayBlocked && videoLoaded && !videoError && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white/90 rounded-lg px-3 py-1 text-black text-sm font-medium animate-pulse">
              Tap to animate
            </div>
          </div>
        )}
        
        {/* Brain Circuit Pattern Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-white/30 rounded-full animate-spin" style={{animationDuration: "10s"}} />
            <div className="absolute w-20 h-20 border border-white/20 rounded-full animate-spin" style={{animationDuration: "8s", animationDirection: "reverse"}} />
          </div>
        </div>
        
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isRecording ? (
            <Square className="w-12 h-12 text-white drop-shadow-lg" data-testid="stop-icon" />
          ) : (
            <Mic className="w-16 h-16 text-white drop-shadow-lg" data-testid="mic-icon" />
          )}
        </div>
      </button>
      
      {/* Status Text */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <p className="text-lg font-medium text-muted-foreground" data-testid="recording-status">
          {isRecording ? "Recording... Tap to stop" : "Tap to start recording"}
        </p>
      </div>
    </div>
  );
}
