import { useState } from "react";
import { Play, Pause, Square, Copy, Download, Share, Check } from "lucide-react";
import { mockLanguages } from "../data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function TranscriptionScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(true);
  const [confidence] = useState(95);
  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [transcript] = useState([
    "नमस्कार, मैं आज आपके साथ कृत्रिम बुद्धिमत्ता के बारे में बात करना चाहता हूं। यह तकनीक हमारे जीवन को कैसे बदल रही है...",
    "Hello, I want to talk to you today about artificial intelligence. How this technology is changing our lives...",
    "और भविष्य में"
  ]);
  const { toast } = useToast();
  
  // Get the full transcript text
  const getFullTranscript = () => {
    return transcript.join(" ");
  };
  
  // Handle stop recording
  const handleStop = () => {
    setIsPlaying(false);
    setIsRecording(false);
    toast({
      title: "Recording Stopped",
      description: "Transcription has been stopped and saved.",
    });
  };
  
  // Handle copy transcript
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getFullTranscript());
      toast({
        title: "Copied to Clipboard",
        description: "Transcript has been copied to your clipboard.",
      });
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = getFullTranscript();
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        toast({
          title: "Copied to Clipboard",
          description: "Transcript has been copied to your clipboard.",
        });
      } catch (fallbackError) {
        toast({
          title: "Copy Failed",
          description: "Unable to copy transcript. Please try again.",
          variant: "destructive"
        });
      }
      document.body.removeChild(textArea);
    }
  };
  
  // Handle download transcript
  const handleDownload = () => {
    try {
      const transcriptText = getFullTranscript();
      const blob = new Blob([transcriptText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `transcript-${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: "Transcript file has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download transcript. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Handle share transcript
  const handleShare = async () => {
    const shareData = {
      title: 'AI Transcription',
      text: getFullTranscript(),
      url: window.location.href
    };
    
    try {
      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Shared Successfully",
          description: "Transcript has been shared.",
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareData.text);
        toast({
          title: "Ready to Share",
          description: "Transcript copied to clipboard - paste it anywhere to share.",
        });
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        toast({
          title: "Share Failed",
          description: "Unable to share transcript. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Live Transcription</h2>
        <div className="flex items-center space-x-2">
          {isRecording ? (
            <>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Recording</span>
            </>
          ) : (
            <>
              <div className="w-3 h-3 bg-gray-400 rounded-full" />
              <span className="text-sm text-muted-foreground">Stopped</span>
            </>
          )}
        </div>
      </div>
      
      {/* Transcript Display */}
      <div className="glassmorphism rounded-xl p-6 min-h-[300px] space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Confidence:</span>
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
                style={{ width: `${confidence}%` }}
              />
            </div>
            <span className="text-sm text-green-400">{confidence}%</span>
          </div>
          
          {/* Language Dropdown */}
          <select 
            className="bg-accent text-foreground rounded-lg px-3 py-2 text-sm border border-border"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            data-testid="language-select"
          >
            {mockLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Mock Transcript with Typing Animation */}
        <div className="space-y-4" data-testid="transcript-content">
          {transcript.map((text, index) => (
            <p 
              key={index}
              className={`text-lg leading-relaxed ${index === transcript.length - 1 ? 'opacity-70' : ''}`}
            >
              {text}
              {index === transcript.length - 1 && (
                <span className="inline-block w-1 h-6 bg-blue-400 ml-1 typing-cursor" />
              )}
            </p>
          ))}
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <button 
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-300"
            onClick={() => setIsPlaying(!isPlaying)}
            data-testid="play-pause-button"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>
          <button 
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleStop}
            disabled={!isRecording}
            data-testid="stop-button"
          >
            <Square className="w-4 h-4" />
            <span>Stop</span>
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button 
            className="p-2 glassmorphism hover:bg-accent rounded-lg transition-all duration-300 group"
            onClick={handleCopy}
            title="Copy transcript"
            data-testid="copy-transcript"
          >
            <Copy className="w-5 h-5 group-hover:text-blue-400" />
          </button>
          <button 
            className="p-2 glassmorphism hover:bg-accent rounded-lg transition-all duration-300 group"
            onClick={handleDownload}
            title="Download transcript"
            data-testid="download-transcript"
          >
            <Download className="w-5 h-5 group-hover:text-green-400" />
          </button>
          <button 
            className="p-2 glassmorphism hover:bg-accent rounded-lg transition-all duration-300 group"
            onClick={handleShare}
            title="Share transcript"
            data-testid="share-transcript"
          >
            <Share className="w-5 h-5 group-hover:text-purple-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
