import { BrainCircuit } from "lucide-react";

export function LoadingModal({ isOpen, onClose, title = "Processing Audio...", description = "AI is analyzing your recording", progress = 65 }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card rounded-2xl p-8 max-w-sm mx-4 text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-spin">
          <BrainCircuit className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-blue-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
