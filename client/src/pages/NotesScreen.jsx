import { useState } from "react";
import { Plus, Edit, Share, Trash } from "lucide-react";
import { mockNotes } from "../data/mockData";

export default function NotesScreen() {
  const [notes] = useState(mockNotes);

  const getTagColor = (tag) => {
    const colors = {
      "AI": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Tech": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Planning": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "Review": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      "Urgent": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    };
    return colors[tag] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  };

  const getDotColor = (color) => {
    const colors = {
      blue: "bg-blue-400",
      green: "bg-green-400",
      purple: "bg-purple-400"
    };
    return colors[color] || "bg-gray-400";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Generated Notes</h2>
        <button 
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300"
          data-testid="new-note-button"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </button>
      </div>
      
      {/* Notes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div 
            key={note.id}
            className="glassmorphism rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer group"
            data-testid={`note-card-${note.id}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 ${getDotColor(note.color)} rounded-full`} />
                <span className="text-sm text-muted-foreground">{note.timestamp}</span>
              </div>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="p-1 hover:bg-accent rounded"
                  data-testid={`edit-note-${note.id}`}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  className="p-1 hover:bg-accent rounded"
                  data-testid={`share-note-${note.id}`}
                >
                  <Share className="w-4 h-4" />
                </button>
                <button 
                  className="p-1 hover:bg-accent rounded text-red-400"
                  data-testid={`delete-note-${note.id}`}
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <h3 className="font-semibold mb-2">{note.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{note.content}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {note.tags.map((tag) => (
                  <span 
                    key={tag}
                    className={`px-2 py-1 text-xs rounded-full ${getTagColor(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button className="text-xs text-blue-400 hover:underline">
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button 
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        data-testid="floating-add-note"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
