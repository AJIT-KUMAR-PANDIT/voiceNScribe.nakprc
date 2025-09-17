import { useState } from "react";
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Download, 
  Clock, 
  FileAudio, 
  Phone, 
  Mic, 
  Users, 
  Languages,
  Star,
  Calendar,
  ArrowUpDown,
  X,
  BookOpen
} from "lucide-react";
import { mockSearchResults, mockSearchFilters } from "../data/mockData";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(mockSearchResults);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    dateRange: "all",
    languages: "all", 
    quality: "all",
    duration: "all",
    types: "all",
    sortBy: "relevance"
  });

  const getTypeIcon = (type) => {
    const icons = {
      meeting: Users,
      call: FileAudio,
      interview: Phone,
      lecture: BookOpen
    };
    return icons[type] || Mic;
  };

  const getTypeColor = (type) => {
    const colors = {
      meeting: "text-blue-400",
      call: "text-green-400", 
      interview: "text-purple-400",
      lecture: "text-orange-400"
    };
    return colors[type] || "text-blue-400";
  };

  const getQualityColor = (quality) => {
    if (quality === "High") return "bg-green-400";
    if (quality === "Medium") return "bg-yellow-400";
    return "bg-red-400";
  };

  const getMatchTypeLabel = (type) => {
    const labels = {
      title: "Title Match",
      content: "Content Match", 
      tags: "Tag Match"
    };
    return labels[type] || "Match";
  };

  const getMatchTypeColor = (type) => {
    const colors = {
      title: "bg-blue-600",
      content: "bg-green-600",
      tags: "bg-purple-600"
    };
    return colors[type] || "bg-gray-600";
  };

  const updateFilter = (key, value) => {
    setSelectedFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      dateRange: "all",
      languages: "all", 
      quality: "all",
      duration: "all",
      types: "all",
      sortBy: "relevance"
    });
  };

  const activeFilterCount = Object.values(selectedFilters).filter(val => val !== "all").length;

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Search Transcripts</h2>
            <p className="text-muted-foreground">Find specific content across all your recordings</p>
          </div>
          <button 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-all duration-300 flex items-center"
            data-testid="export-results"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input 
            type="text"
            placeholder="Search transcripts, titles, content, or tags..."
            className="w-full pl-12 pr-16 py-4 bg-accent rounded-xl border border-border focus:ring-2 focus:ring-blue-400 transition-all text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="main-search-input"
          />
          <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <button 
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-300 ${
              showFilters ? "bg-blue-600 text-white" : "glassmorphism hover:bg-accent"
            }`}
            onClick={() => setShowFilters(!showFilters)}
            data-testid="toggle-filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Search Suggestions */}
        <div className="flex flex-wrap gap-2">
          {["AI Strategy", "Client Meeting", "Hindi", "Last Week"].map((suggestion) => (
            <button 
              key={suggestion}
              className="px-3 py-1 bg-accent hover:bg-accent/80 rounded-full text-xs transition-all duration-300"
              onClick={() => setSearchQuery(suggestion)}
              data-testid={`suggestion-${suggestion.toLowerCase().replace(" ", "-")}`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="glassmorphism rounded-xl p-6 space-y-6" data-testid="filters-panel">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Advanced Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </h3>
            <button 
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
              onClick={clearFilters}
              data-testid="clear-filters"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Date Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Date Range</label>
              <select 
                className="w-full bg-background text-foreground rounded-lg px-3 py-2 border border-border focus:ring-2 focus:ring-blue-400 transition-all"
                value={selectedFilters.dateRange}
                onChange={(e) => updateFilter("dateRange", e.target.value)}
                data-testid="filter-date-range"
              >
                {mockSearchFilters.dateRange.map(option => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Languages */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Language</label>
              <select 
                className="w-full bg-background text-foreground rounded-lg px-3 py-2 border border-border focus:ring-2 focus:ring-blue-400 transition-all"
                value={selectedFilters.languages}
                onChange={(e) => updateFilter("languages", e.target.value)}
                data-testid="filter-languages"
              >
                {mockSearchFilters.languages.map(option => (
                  <option key={option} value={option}>
                    {option === "all" ? "All Languages" : option.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Quality */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Quality</label>
              <select 
                className="w-full bg-background text-foreground rounded-lg px-3 py-2 border border-border focus:ring-2 focus:ring-blue-400 transition-all"
                value={selectedFilters.quality}
                onChange={(e) => updateFilter("quality", e.target.value)}
                data-testid="filter-quality"
              >
                {mockSearchFilters.quality.map(option => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Duration</label>
              <select 
                className="w-full bg-background text-foreground rounded-lg px-3 py-2 border border-border focus:ring-2 focus:ring-blue-400 transition-all"
                value={selectedFilters.duration}
                onChange={(e) => updateFilter("duration", e.target.value)}
                data-testid="filter-duration"
              >
                <option value="all">All Durations</option>
                <option value="short">Short (&lt; 15 min)</option>
                <option value="medium">Medium (15-60 min)</option>
                <option value="long">Long (&gt; 60 min)</option>
              </select>
            </div>

            {/* Types */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Type</label>
              <select 
                className="w-full bg-background text-foreground rounded-lg px-3 py-2 border border-border focus:ring-2 focus:ring-blue-400 transition-all"
                value={selectedFilters.types}
                onChange={(e) => updateFilter("types", e.target.value)}
                data-testid="filter-types"
              >
                {mockSearchFilters.types.map(option => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Sort By</label>
              <select 
                className="w-full bg-background text-foreground rounded-lg px-3 py-2 border border-border focus:ring-2 focus:ring-blue-400 transition-all"
                value={selectedFilters.sortBy}
                onChange={(e) => updateFilter("sortBy", e.target.value)}
                data-testid="filter-sort-by"
              >
                {mockSearchFilters.sortBy.map(option => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold">
            {searchResults.length} Results
            {searchQuery && (
              <span className="text-muted-foreground font-normal"> for "{searchQuery}"</span>
            )}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <ArrowUpDown className="w-4 h-4 mr-1" />
            Sorted by {selectedFilters.sortBy}
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-4" data-testid="search-results">
        {searchResults.map((result) => {
          const TypeIcon = getTypeIcon(result.type);
          
          return (
            <div 
              key={result.id}
              className="glassmorphism rounded-xl p-6 hover:scale-[1.01] transition-all duration-300"
              data-testid={`result-${result.id}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg glassmorphism ${getTypeColor(result.type)}`}>
                    <TypeIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-lg">{result.title}</h4>
                      <div className={`px-2 py-1 ${getMatchTypeColor(result.matchType)} text-white text-xs rounded-full`}>
                        {getMatchTypeLabel(result.matchType)}
                      </div>
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 mr-1" />
                        <span className="text-sm">{result.relevanceScore}%</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {result.timestamp}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {result.duration}
                      </div>
                      <div className="flex items-center">
                        <Languages className="w-4 h-4 mr-1" />
                        {result.language}
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 ${getQualityColor(result.quality)} rounded-full`} />
                        <span>{result.quality}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {result.snippet}
                    </p>
                    <div className="flex items-center space-x-2">
                      {result.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-accent text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex space-x-2">
                  <button 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-all duration-300"
                    data-testid={`view-${result.id}`}
                  >
                    View Full Transcript
                  </button>
                  <button 
                    className="px-4 py-2 glassmorphism hover:bg-accent rounded-lg text-sm transition-all duration-300"
                    data-testid={`analyze-${result.id}`}
                  >
                    AI Analysis
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="p-2 glassmorphism hover:bg-accent rounded-lg transition-all duration-300"
                    data-testid={`download-${result.id}`}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="text-center py-6">
        <button 
          className="px-6 py-3 glassmorphism hover:bg-accent rounded-lg transition-all duration-300"
          data-testid="load-more-results"
        >
          Load More Results
        </button>
      </div>
    </div>
  );
}