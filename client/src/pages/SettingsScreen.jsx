import { useState } from "react";
import { AudioLines, BrainCircuit, Settings, ShieldCheck, Trash2, Download, Play } from "lucide-react";
import { mockSettings, mockLanguages } from "../data/mockData";
import { useTheme } from "../components/ThemeProvider";

export default function SettingsScreen() {
  const [settings, setSettings] = useState(mockSettings);
  const { theme, toggleTheme } = useTheme();

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const ToggleSwitch = ({ checked, onChange, testId }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        data-testid={testId}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
    </label>
  );

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Settings</h2>

      {/* Audio Settings */}
      <div className="glassmorphism rounded-xl p-6 space-y-6">
        <h3 className="text-lg font-semibold flex items-center">
          <AudioLines className="w-5 h-5 mr-2" />
          Audio Settings
        </h3>

        {/* STT Model Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">Speech-to-Text Model</label>
          <select 
            className="w-full bg-accent text-foreground rounded-lg px-4 py-3 border border-border focus:ring-2 focus:ring-blue-400 transition-all"
            value={settings.sttModel}
            onChange={(e) => updateSetting("sttModel", e.target.value)}
            data-testid="stt-model-select"
          >
            <option value="whisper">Whisper.cpp (Recommended)</option>
            <option value="vosk">Vosk (Offline)</option>
            <option value="cloud">Cloud STT</option>
          </select>
        </div>

        {/* Default Language */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">Default Language</label>
          <select 
            className="w-full bg-accent text-foreground rounded-lg px-4 py-3 border border-border focus:ring-2 focus:ring-blue-400 transition-all"
            value={settings.defaultLanguage}
            onChange={(e) => updateSetting("defaultLanguage", e.target.value)}
            data-testid="default-language-select"
          >
            {mockLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* TTS Voice */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">Text-to-Speech Voice</label>
          <div className="flex items-center space-x-4">
            <select 
              className="flex-1 bg-accent text-foreground rounded-lg px-4 py-3 border border-border focus:ring-2 focus:ring-blue-400 transition-all"
              value={settings.ttsVoice}
              onChange={(e) => updateSetting("ttsVoice", e.target.value)}
              data-testid="tts-voice-select"
            >
              <option value="female">Female (Hindi)</option>
              <option value="male">Male (Hindi)</option>
              <option value="en-female">Female (English)</option>
              <option value="en-male">Male (English)</option>
            </select>
            <button 
              className="px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-300"
              data-testid="test-voice"
            >
              <Play className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Settings */}
      <div className="glassmorphism rounded-xl p-6 space-y-6">
        <h3 className="text-lg font-semibold flex items-center">
          <BrainCircuit className="w-5 h-5 mr-2" />
          AI Settings
        </h3>

        {/* LLM Source */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">AI Model Source</label>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="radio" 
                name="llm-source" 
                value="local" 
                className="text-blue-600"
                checked={settings.llmSource === "local"}
                onChange={(e) => updateSetting("llmSource", e.target.value)}
                data-testid="llm-local"
              />
              <span>Local Model (Offline)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="radio" 
                name="llm-source" 
                value="cloud" 
                className="text-blue-600"
                checked={settings.llmSource === "cloud"}
                onChange={(e) => updateSetting("llmSource", e.target.value)}
                data-testid="llm-cloud"
              />
              <span>Cloud API</span>
            </label>
          </div>
        </div>

        {/* Model Download Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Whisper Model (Large)</span>
            <span className="text-xs text-green-400">Downloaded</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-green-400 h-2 rounded-full w-full transition-all duration-300" />
          </div>
        </div>
      </div>

      {/* App Settings */}
      <div className="glassmorphism rounded-xl p-6 space-y-6">
        <h3 className="text-lg font-semibold flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          App Settings
        </h3>

        {/* Toggle Settings */}
        <div className="space-y-4">
          {/* Offline Mode */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-medium">Offline-First Mode</div>
              <div className="text-sm text-muted-foreground">Process audio locally when possible</div>
            </div>
            <ToggleSwitch 
              checked={settings.offlineMode}
              onChange={(checked) => updateSetting("offlineMode", checked)}
              testId="offline-mode-toggle"
            />
          </div>

          {/* Background Transcription */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-medium">Background Transcription</div>
              <div className="text-sm text-muted-foreground">Continue recording when app is minimized</div>
            </div>
            <ToggleSwitch 
              checked={settings.backgroundTranscription}
              onChange={(checked) => updateSetting("backgroundTranscription", checked)}
              testId="background-transcription-toggle"
            />
          </div>

          {/* Auto-Save */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-medium">Auto-Save Transcripts</div>
              <div className="text-sm text-muted-foreground">Automatically save completed transcriptions</div>
            </div>
            <ToggleSwitch 
              checked={settings.autoSave}
              onChange={(checked) => updateSetting("autoSave", checked)}
              testId="auto-save-toggle"
            />
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-medium">Dark Mode</div>
              <div className="text-sm text-muted-foreground">Use dark theme</div>
            </div>
            <ToggleSwitch 
              checked={theme === "dark"}
              onChange={toggleTheme}
              testId="dark-mode-toggle"
            />
          </div>
        </div>
      </div>

      {/* Storage & Privacy */}
      <div className="glassmorphism rounded-xl p-6 space-y-6">
        <h3 className="text-lg font-semibold flex items-center">
          <ShieldCheck className="w-5 h-5 mr-2" />
          Storage & Privacy
        </h3>

        <div className="space-y-4">
          <button 
            className="w-full flex items-center justify-between p-4 bg-accent hover:bg-accent/80 rounded-lg transition-all duration-300"
            data-testid="clear-all-data"
          >
            <div className="text-left">
              <div className="font-medium">Clear All Data</div>
              <div className="text-sm text-muted-foreground">Remove all transcripts and settings</div>
            </div>
            <Trash2 className="w-5 h-5 text-red-400" />
          </button>

          <button 
            className="w-full flex items-center justify-between p-4 bg-accent hover:bg-accent/80 rounded-lg transition-all duration-300"
            data-testid="export-data"
          >
            <div className="text-left">
              <div className="font-medium">Export Data</div>
              <div className="text-sm text-muted-foreground">Download your transcripts and settings</div>
            </div>
            <Download className="w-5 h-5 text-blue-400" />
          </button>

          <div className="pt-4 border-t border-border">
            <div className="text-center space-y-2">
              <div className="text-sm text-muted-foreground">Storage Used: 45.2 MB</div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full w-[30%] transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
