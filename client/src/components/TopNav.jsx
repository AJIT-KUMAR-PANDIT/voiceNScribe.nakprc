import { BrainCircuit, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState, useRef, useEffect } from "react";

const languages = [
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
  { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "മലയാളം", flag: "🇮🇳" },
  { code: "or", name: "ଓଡ଼ିଆ", flag: "🇮🇳" },
];

export function TopNav() {
  const { theme, toggleTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
    }

    // Handle escape key to close dropdown
    function handleEscapeKey(event) {
      if (event.key === 'Escape') {
        setShowLanguageDropdown(false);
      }
    }

    if (showLanguageDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showLanguageDropdown]);

  return (
    <header className="sticky top-0 z-50 glassmorphism border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div 
            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center"
            data-testid="app-logo"
          >
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            VoiceAI
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg glassmorphism hover:bg-accent transition-all duration-300"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              data-testid="language-selector"
              aria-haspopup="listbox"
              aria-expanded={showLanguageDropdown}
            >
              <span className="text-2xl">{selectedLanguage.flag}</span>
              <span className="text-sm font-medium">{selectedLanguage.name}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showLanguageDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showLanguageDropdown && (
              <div 
                className="absolute top-full right-0 mt-2 glassmorphism-dropdown language-dropdown rounded-lg z-[100]"
                role="listbox"
                aria-label="Select language"
              >
                <div className="p-2 space-y-1">
                  {languages.map((lang, index) => (
                    <button
                      key={lang.code}
                      className="language-dropdown-item w-full flex items-center space-x-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setShowLanguageDropdown(false);
                      }}
                      data-testid={`language-option-${lang.code}`}
                      role="option"
                      aria-selected={selectedLanguage.code === lang.code}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedLanguage(lang);
                          setShowLanguageDropdown(false);
                        }
                      }}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-medium flex-1 text-left">{lang.name}</span>
                      {selectedLanguage.code === lang.code && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Theme Toggle */}
          <button 
            className="p-2 rounded-lg glassmorphism hover:bg-accent transition-all duration-300"
            onClick={toggleTheme}
            data-testid="theme-toggle"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
