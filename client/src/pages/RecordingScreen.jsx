import { useState } from "react";
import { MicButton } from "../components/MicButton";
import { WaveformVisualizer } from "../components/WaveformVisualizer";
import { useRecording } from "../hooks/useRecording";

export default function RecordingScreen() {
  const { isRecording, duration, quality, toggleRecording } = useRecording();
  const [selectedLanguage] = useState("Hindi");

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center space-y-8">
      <h2 className="text-3xl font-bold mb-8">Ready to Record</h2>
      
      <MicButton 
        onRecordingChange={toggleRecording}
        data-testid="main-mic-button"
      />
      
      {/* Audio Waveform Visualization */}
      <WaveformVisualizer 
        isActive={isRecording}
        className="mb-8"
      />
      
      {/* Recording Stats */}
      <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
        <div className="glassmorphism rounded-xl p-4 text-center" data-testid="duration-display">
          <div className="text-2xl font-bold text-blue-400">{formatDuration(duration)}</div>
          <div className="text-sm text-muted-foreground">Duration</div>
        </div>
        <div className="glassmorphism rounded-xl p-4 text-center" data-testid="quality-display">
          <div className="text-2xl font-bold text-green-400">{quality}%</div>
          <div className="text-sm text-muted-foreground">Quality</div>
        </div>
        <div className="glassmorphism rounded-xl p-4 text-center" data-testid="language-display">
          <div className="text-2xl font-bold text-purple-400">{selectedLanguage}</div>
          <div className="text-sm text-muted-foreground">Language</div>
        </div>
      </div>
    </div>
  );
}
