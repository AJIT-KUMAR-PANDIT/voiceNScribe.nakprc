import { useState } from "react";
import { Send, Paperclip, Mic, Trash, BrainCircuit, User, ThumbsUp, ThumbsDown, Copy } from "lucide-react";
import { mockChatMessages } from "../data/mockData";

export default function ChatScreen() {
  const [messages] = useState(mockChatMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Mock sending message
      setInputMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Assistant</h2>
        <button 
          className="px-4 py-2 glassmorphism rounded-lg hover:bg-accent transition-all duration-300"
          data-testid="clear-chat"
        >
          <Trash className="w-4 h-4 mr-2" />
          Clear Chat
        </button>
      </div>

      {/* Chat Messages */}
      <div className="glassmorphism rounded-xl p-6 min-h-[500px] space-y-4" data-testid="chat-messages">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex items-start space-x-3 ${message.type === "user" ? "justify-end" : ""}`}
          >
            {message.type === "ai" && (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <BrainCircuit className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className="flex-1 space-y-2">
              <div className={`rounded-2xl p-4 max-w-[80%] ${
                message.type === "ai" 
                  ? "bg-accent rounded-tl-sm" 
                  : "bg-blue-600 text-white rounded-tr-sm ml-auto"
              }`}>
                <p className="text-sm whitespace-pre-line">{message.content}</p>
              </div>
              
              <div className={`flex items-center space-x-2 text-xs text-muted-foreground ${
                message.type === "user" ? "justify-end" : ""
              }`}>
                {message.type === "ai" ? (
                  <>
                    <span>AI Assistant</span>
                    <span>•</span>
                    <span>{message.timestamp}</span>
                    <div className="flex space-x-1 ml-4">
                      <button 
                        className="hover:text-blue-400 transition-colors"
                        data-testid={`thumbs-up-${message.id}`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button 
                        className="hover:text-red-400 transition-colors"
                        data-testid={`thumbs-down-${message.id}`}
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                      <button 
                        className="hover:text-green-400 transition-colors"
                        data-testid={`copy-message-${message.id}`}
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span>{message.timestamp}</span>
                    <span>•</span>
                    <span>You</span>
                  </>
                )}
              </div>
            </div>
            
            {message.type === "user" && (
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <div className="bg-accent rounded-2xl rounded-tl-sm p-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: "0.2s"}} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: "0.4s"}} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="glassmorphism rounded-xl p-4">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <textarea 
              placeholder="Ask me anything about your transcripts..."
              className="w-full bg-transparent resize-none border-0 focus:ring-0 text-sm placeholder-muted-foreground max-h-32 focus:outline-none"
              rows="1"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              data-testid="chat-input"
            />
          </div>
          <div className="flex space-x-2">
            <button 
              className="p-2 hover:bg-accent rounded-lg transition-all duration-300"
              data-testid="attach-file"
            >
              <Paperclip className="w-5 h-5 text-muted-foreground" />
            </button>
            <button 
              className="p-2 hover:bg-accent rounded-lg transition-all duration-300"
              data-testid="voice-input"
            >
              <Mic className="w-5 h-5 text-muted-foreground" />
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              data-testid="send-message"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
