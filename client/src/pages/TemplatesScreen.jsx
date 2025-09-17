import { useState } from "react";
import { 
  Plus, 
  Star, 
  Users, 
  MessageCircle, 
  BookOpen, 
  Mic, 
  Phone, 
  Eye, 
  Edit3, 
  Copy,
  Search,
  Filter,
  Sparkles,
  TrendingUp,
  Check
} from "lucide-react";
import { mockTemplates } from "../data/mockData";

export default function TemplatesScreen() {
  const [templates] = useState(mockTemplates);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const categories = ["all", "Business", "HR", "Education", "Media", "Communication"];

  const getTemplateIcon = (icon) => {
    const icons = {
      Users,
      MessageCircle,
      BookOpen,
      Mic,
      Phone
    };
    return icons[icon] || Users;
  };

  const getTemplateColor = (color) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
      teal: "from-teal-500 to-teal-600"
    };
    return colors[color] || colors.blue;
  };

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularTemplates = templates.filter(t => t.isPopular);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Templates</h2>
          <p className="text-muted-foreground">Pre-built templates to organize your transcripts</p>
        </div>
        <button 
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center"
          onClick={() => setShowCreateModal(true)}
          data-testid="create-template"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <input 
            type="text"
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-3 bg-accent rounded-lg border border-border focus:ring-2 focus:ring-blue-400 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="template-search-input"
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "glassmorphism hover:bg-accent"
              }`}
              onClick={() => setSelectedCategory(category)}
              data-testid={`category-${category.toLowerCase()}`}
            >
              {category === "all" ? "All" : category}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Templates Section */}
      {selectedCategory === "all" && searchQuery === "" && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold">Popular Templates</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTemplates.map((template) => {
              const TemplateIcon = getTemplateIcon(template.icon);
              
              return (
                <div 
                  key={template.id}
                  className="relative glassmorphism rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 group"
                  data-testid={`popular-template-${template.id}`}
                >
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Popular
                    </div>
                  </div>
                  
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getTemplateColor(template.color)} flex items-center justify-center mb-4`}>
                    <TemplateIcon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h4 className="font-semibold text-lg mb-2">{template.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{template.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span>{template.fields.length} fields</span>
                    <span>{template.usageCount} uses</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-all duration-300"
                      data-testid={`use-template-${template.id}`}
                    >
                      Use Template
                    </button>
                    <button 
                      className="p-2 glassmorphism hover:bg-accent rounded-lg transition-all duration-300"
                      data-testid={`preview-template-${template.id}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All Templates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {selectedCategory === "all" ? "All Templates" : `${selectedCategory} Templates`}
            <span className="text-sm text-muted-foreground font-normal ml-2">
              ({filteredTemplates.length})
            </span>
          </h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>Sort by Usage</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="templates-grid">
          {filteredTemplates.map((template) => {
            const TemplateIcon = getTemplateIcon(template.icon);
            
            return (
              <div 
                key={template.id}
                className="glassmorphism rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 group"
                data-testid={`template-${template.id}`}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getTemplateColor(template.color)} flex items-center justify-center mb-4`}>
                  <TemplateIcon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-lg">{template.name}</h4>
                  {template.isPopular && (
                    <div className="flex items-center text-yellow-400 text-xs">
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="px-2 py-1 bg-accent rounded-full">{template.category}</span>
                    <span>{template.usageCount} uses</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Sample Fields:</div>
                    <div className="flex flex-wrap gap-1">
                      {template.fields.slice(0, 3).map((field, index) => (
                        <span key={index} className="text-xs bg-accent px-2 py-1 rounded">
                          {field}
                        </span>
                      ))}
                      {template.fields.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{template.fields.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-all duration-300 flex items-center justify-center"
                    data-testid={`use-template-${template.id}`}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Use Template
                  </button>
                  <button 
                    className="p-2 glassmorphism hover:bg-accent rounded-lg transition-all duration-300"
                    data-testid={`preview-template-${template.id}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-2 glassmorphism hover:bg-accent rounded-lg transition-all duration-300"
                    data-testid={`copy-template-${template.id}`}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12 glassmorphism rounded-xl">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? `No templates match "${searchQuery}"` : `No templates in ${selectedCategory} category`}
                </p>
              </div>
              <button 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
                onClick={() => setShowCreateModal(true)}
              >
                Create Your Own Template
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="glassmorphism rounded-xl p-6 m-4 max-w-md w-full" data-testid="create-template-modal">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-blue-400" />
                Create Custom Template
              </h3>
              <button 
                className="p-1 hover:bg-accent rounded-lg transition-all duration-300"
                onClick={() => setShowCreateModal(false)}
                data-testid="close-modal"
              >
                <Plus className="w-5 h-5 transform rotate-45" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Template Name</label>
                <input 
                  type="text"
                  placeholder="Enter template name..."
                  className="w-full px-3 py-2 bg-accent rounded-lg border border-border focus:ring-2 focus:ring-blue-400 transition-all"
                  data-testid="template-name-input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea 
                  placeholder="Describe what this template is for..."
                  rows={3}
                  className="w-full px-3 py-2 bg-accent rounded-lg border border-border focus:ring-2 focus:ring-blue-400 transition-all resize-none"
                  data-testid="template-description-input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select 
                  className="w-full bg-accent text-foreground rounded-lg px-3 py-2 border border-border focus:ring-2 focus:ring-blue-400 transition-all"
                  data-testid="template-category-select"
                >
                  <option value="Business">Business</option>
                  <option value="HR">HR</option>
                  <option value="Education">Education</option>
                  <option value="Media">Media</option>
                  <option value="Communication">Communication</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                className="flex-1 py-2 glassmorphism hover:bg-accent rounded-lg transition-all duration-300"
                onClick={() => setShowCreateModal(false)}
                data-testid="cancel-template"
              >
                Cancel
              </button>
              <button 
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
                data-testid="save-template"
              >
                Create Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}