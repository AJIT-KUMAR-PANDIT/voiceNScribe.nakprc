import { useState, useCallback } from "react";

export function useRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [quality, setQuality] = useState(98);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    // Mock recording functionality
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    // Mock stop recording functionality
  }, []);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  return {
    isRecording,
    duration,
    quality,
    startRecording,
    stopRecording,
    toggleRecording
  };
}
