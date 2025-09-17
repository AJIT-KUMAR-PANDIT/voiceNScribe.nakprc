import { useState } from "react";
import { Search, Filter, Mic, FileAudio, Phone, Clock, Users, Brain, Languages, HelpCircle } from "lucide-react";
import { mockTranscripts } from "../data/mockData";

export default function HistoryScreen() {
  const [transcripts] = useState(mockTranscripts);
  const [searchQuery, setSearchQuery] = useState("");

  const getTypeIcon = (type) => {
    const icons = {
      meeting: Mic,
      call: FileAudio,
      interview: Phone
    };
    return icons[type] || Mic;
  };

  const getTypeColor = (type) => {
    const colors = {
      meeting: "bg-blue-400",
      call: "bg-green-400", 
      interview: "bg-purple-400"
    };
    return colors[type] || "bg-blue-400";
  };

  const getQualityColor = (quality) => {
    if (quality === "High") return "bg-green-400";
    if (quality === "Medium") return "bg-yellow-400";
    return "bg-red-400";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Transcription History</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <input 
              type="text"
              placeholder="Search transcripts..."
              className="pl-10 pr-4 py-2 bg-accent rounded-lg border border-border focus:ring-2 focus:ring-blue-400 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="search-input"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
          <button 
            className="px-4 py-2 glassmorphism rounded-lg hover:bg-accent transition-all duration-300"
            data-testid="filter-button"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Timeline View */}
      <div className="space-y-6">
        {transcripts.map((transcript, index) => {
          const TypeIcon = getTypeIcon(transcript.type);
          
          return (
            <div 
              key={transcript.id}
              className="relative pl-8 pb-8 border-l-2 border-blue-400 last:border-l-0 last:pb-0"
            >
              <div className={`absolute -left-3 top-0 w-6 h-6 ${getTypeColor(transcript.type)} rounded-full flex items-center justify-center`}>
                <TypeIcon className="w-3 h-3 text-white" />
              </div>
              
              <div 
                className="glassmorphism rounded-xl p-6 hover:scale-[1.02] transition-all duration-300"
                data-testid={`transcript-${transcript.id}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{transcript.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {transcript.timestamp} • {transcript.duration} • {transcript.language}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs transition-all duration-300"
                      data-testid={`summarize-${transcript.id}`}
                    >
                      <Brain className="w-3 h-3 mr-1 inline" />
                      Summarize
                    </button>
                    <button 
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-xs transition-all duration-300"
                      data-testid={`translate-${transcript.id}`}
                    >
                      <Languages className="w-3 h-3 mr-1 inline" />
                      Translate
                    </button>
                    <button 
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-xs transition-all duration-300"
                      data-testid={`qa-${transcript.id}`}
                    >
                      <HelpCircle className="w-3 h-3 mr-1 inline" />
                      Q&A
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{transcript.content}</p>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{transcript.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{transcript.speakers} speakers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 ${getQualityColor(transcript.quality)} rounded-full`} />
                    <span className="text-xs text-muted-foreground">{transcript.quality} Quality</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
