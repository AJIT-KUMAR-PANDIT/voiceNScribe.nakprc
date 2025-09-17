import { Switch, Route } from "wouter";
import { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { TopNav } from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import { LoadingModal } from "./components/LoadingModal";
import RecordingScreen from "./pages/RecordingScreen";
import TranscriptionScreen from "./pages/TranscriptionScreen";
import NotesScreen from "./pages/NotesScreen";
import HistoryScreen from "./pages/HistoryScreen";
import ChatScreen from "./pages/ChatScreen";
import SettingsScreen from "./pages/SettingsScreen";
import DashboardScreen from "./pages/DashboardScreen";
import SearchScreen from "./pages/SearchScreen";
import TemplatesScreen from "./pages/TemplatesScreen";
import ProfileScreen from "./pages/ProfileScreen";

function Router() {
  return (
    <Switch>
      <Route path="/" component={RecordingScreen} />
      <Route path="/transcription" component={TranscriptionScreen} />
      <Route path="/notes" component={NotesScreen} />
      <Route path="/history" component={HistoryScreen} />
      <Route path="/chat" component={ChatScreen} />
      <Route path="/settings" component={SettingsScreen} />
      <Route path="/dashboard" component={DashboardScreen} />
      <Route path="/search" component={SearchScreen} />
      <Route path="/templates" component={TemplatesScreen} />
      <Route path="/profile" component={ProfileScreen} />
      <Route component={RecordingScreen} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <TopNav />

        <main className="flex-1 container mx-auto px-4 py-6 mb-16">
          <Router />
        </main>

        {/* The dock */}
        <BottomNav />
        <LoadingModal isOpen={isLoading} onClose={() => setIsLoading(false)} />
      </div>
    </ThemeProvider>
  );
}

export default App;
