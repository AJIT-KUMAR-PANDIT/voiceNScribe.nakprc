export const mockTranscripts = [
  {
    id: "1",
    title: "Team Meeting - AI Strategy",
    timestamp: "Today, 2:30 PM",
    duration: "45:23",
    language: "Hindi",
    speakers: 5,
    quality: "High",
    content: "हमारी टीम ने कृत्रिम बुद्धिमत्ता रणनीति पर चर्चा की और आगामी परियोजनाओं के लिए योजना बनाई...",
    type: "meeting",
    tags: ["AI", "Strategy", "Planning"]
  },
  {
    id: "2",
    title: "Product Planning Call",
    timestamp: "Yesterday, 11:15 AM",
    duration: "32:45",
    language: "English",
    speakers: 3,
    quality: "High",
    content: "Discussion about the upcoming product features, user feedback analysis, and roadmap priorities for Q4...",
    type: "call",
    tags: ["Product", "Planning", "Roadmap"]
  },
  {
    id: "3",
    title: "Client Interview",
    timestamp: "2 days ago, 4:00 PM",
    duration: "28:12",
    language: "Hindi/English",
    speakers: 2,
    quality: "Medium",
    content: "क्लाइंट के साथ प्रारंभिक चर्चा और उनकी आवश्यकताओं को समझना...",
    type: "interview",
    tags: ["Client", "Interview", "Requirements"]
  }
];

export const mockNotes = [
  {
    id: "1",
    title: "AI Technology Meeting",
    timestamp: "12:34 PM",
    content: "Key points about artificial intelligence implementation in our organization...",
    tags: ["AI", "Tech"],
    color: "blue"
  },
  {
    id: "2",
    title: "Project Planning Session",
    timestamp: "11:20 AM",
    content: "Discussion about upcoming features and timeline adjustments for Q4...",
    tags: ["Planning"],
    color: "green"
  },
  {
    id: "3",
    title: "Product Demo Review",
    timestamp: "09:45 AM",
    content: "Feedback and suggestions from the latest product demonstration...",
    tags: ["Review", "Urgent"],
    color: "purple"
  }
];

export const mockChatMessages = [
  {
    id: "1",
    type: "ai",
    content: "Hello! I'm your AI assistant. I can help you summarize your transcripts, answer questions about your recordings, and provide insights. How can I help you today?",
    timestamp: "Just now"
  },
  {
    id: "2", 
    type: "user",
    content: "Can you summarize my latest team meeting transcript?",
    timestamp: "2 mins ago"
  },
  {
    id: "3",
    type: "ai",
    content: `Here's a summary of your latest team meeting:

**🎯 Key Topics:**
• AI strategy implementation
• Q4 project planning  
• Resource allocation

**📝 Action Items:**
• Research AI tools by next week
• Schedule client demo
• Prepare budget proposal`,
    timestamp: "1 min ago"
  }
];

export const mockSettings = {
  sttModel: "whisper",
  defaultLanguage: "hi",
  ttsVoice: "female",
  llmSource: "cloud",
  offlineMode: true,
  backgroundTranscription: false,
  autoSave: true,
  darkMode: true
};

export const mockLanguages = [
  { code: "hi", name: "हिंदी (Hindi)", flag: "🇮🇳" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ta", name: "தமிழ் (Tamil)", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు (Telugu)", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা (Bengali)", flag: "🇮🇳" },
  { code: "mr", name: "मराठी (Marathi)", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી (Gujarati)", flag: "🇮🇳" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)", flag: "🇮🇳" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)", flag: "🇮🇳" },
  { code: "ml", name: "മലയാളം (Malayalam)", flag: "🇮🇳" },
  { code: "or", name: "ଓଡ଼ିଆ (Odia)", flag: "🇮🇳" }
];

// Dashboard Data
export const mockDashboardStats = {
  totalRecordings: 45,
  hoursTranscribed: 127.5,
  averageAccuracy: 94.2,
  storageUsed: 2.1, // GB
  storageLimit: 10, // GB
  weeklyGrowth: 12.5, // percentage
  languageUsage: [
    { language: "Hindi", percentage: 45, color: "#3b82f6" },
    { language: "English", percentage: 35, color: "#10b981" },
    { language: "Tamil", percentage: 12, color: "#f59e0b" },
    { language: "Others", percentage: 8, color: "#8b5cf6" }
  ],
  transcriptionTrends: [
    { date: "Sep 10", recordings: 3, hours: 4.5 },
    { date: "Sep 11", recordings: 5, hours: 7.2 },
    { date: "Sep 12", recordings: 2, hours: 3.1 },
    { date: "Sep 13", recordings: 8, hours: 11.4 },
    { date: "Sep 14", recordings: 6, hours: 8.7 },
    { date: "Sep 15", recordings: 4, hours: 5.9 },
    { date: "Sep 16", recordings: 7, hours: 9.8 },
    { date: "Sep 17", recordings: 5, hours: 6.3 }
  ],
  recentActivity: [
    {
      id: "1",
      type: "transcription",
      title: "Team Meeting - AI Strategy",
      timestamp: "2 hours ago",
      status: "completed",
      icon: "FileText"
    },
    {
      id: "2", 
      type: "analysis",
      title: "Client Interview Analysis",
      timestamp: "5 hours ago", 
      status: "completed",
      icon: "Brain"
    },
    {
      id: "3",
      type: "export",
      title: "Q4 Planning Data Export",
      timestamp: "1 day ago",
      status: "completed",
      icon: "Download"
    }
  ]
};

// Search Data
export const mockSearchResults = [
  {
    id: "1",
    title: "Team Meeting - AI Strategy",
    type: "meeting",
    duration: "45:23",
    timestamp: "Today, 2:30 PM",
    language: "Hindi",
    quality: "High",
    matchType: "title",
    snippet: "हमारी टीम ने कृत्रिम बुद्धिमत्ता रणनीति पर चर्चा की और आगामी परियोजनाओं के लिए योजना बनाई...",
    tags: ["AI", "Strategy", "Planning"],
    relevanceScore: 98
  },
  {
    id: "2", 
    title: "Product Planning Call",
    type: "call",
    duration: "32:45",
    timestamp: "Yesterday, 11:15 AM",
    language: "English", 
    quality: "High",
    matchType: "content",
    snippet: "Discussion about the upcoming product features, user feedback analysis, and roadmap priorities for Q4...",
    tags: ["Product", "Planning", "Roadmap"],
    relevanceScore: 87
  },
  {
    id: "4",
    title: "Marketing Strategy Session",
    type: "meeting",
    duration: "38:20",
    timestamp: "3 days ago, 9:00 AM",
    language: "English",
    quality: "High", 
    matchType: "tags",
    snippet: "Comprehensive marketing strategy for the new product launch, including digital campaigns, content strategy...",
    tags: ["Marketing", "Strategy", "Campaign"],
    relevanceScore: 76
  }
];

export const mockSearchFilters = {
  dateRange: ["all", "today", "week", "month", "custom"],
  languages: ["all", "hi", "en", "ta", "te", "bn"],
  quality: ["all", "high", "medium", "low"],
  duration: ["all", "short", "medium", "long"], // <15min, 15-60min, >60min
  types: ["all", "meeting", "call", "interview", "lecture"],
  sortBy: ["relevance", "date", "duration", "quality"]
};

// Templates Data
export const mockTemplates = [
  {
    id: "1",
    name: "Meeting Notes Template",
    description: "Perfect for team meetings, standups, and planning sessions",
    icon: "Users",
    color: "blue",
    category: "Business",
    fields: [
      "Meeting Title",
      "Date & Time", 
      "Attendees",
      "Agenda Items",
      "Key Decisions",
      "Action Items",
      "Next Steps"
    ],
    usageCount: 234,
    isPopular: true
  },
  {
    id: "2",
    name: "Interview Template", 
    description: "Structured format for job interviews and candidate evaluations",
    icon: "MessageCircle",
    color: "green", 
    category: "HR",
    fields: [
      "Candidate Name",
      "Position", 
      "Interview Date",
      "Technical Skills Assessment",
      "Behavioral Questions",
      "Overall Rating",
      "Recommendation"
    ],
    usageCount: 156,
    isPopular: true
  },
  {
    id: "3",
    name: "Lecture Template",
    description: "Educational content organization for classes and seminars", 
    icon: "BookOpen",
    color: "purple",
    category: "Education",
    fields: [
      "Course/Subject",
      "Lecture Topic",
      "Learning Objectives", 
      "Key Concepts",
      "Examples/Case Studies",
      "Q&A Session",
      "Homework/Assignments"
    ],
    usageCount: 89,
    isPopular: false
  },
  {
    id: "4", 
    name: "Podcast Template",
    description: "Content structure for podcast recordings and episodes",
    icon: "Mic",
    color: "orange",
    category: "Media",
    fields: [
      "Episode Title",
      "Guest Information",
      "Episode Summary",
      "Main Topics",
      "Timestamps",
      "Sponsor Messages", 
      "Call to Action"
    ],
    usageCount: 67,
    isPopular: false
  },
  {
    id: "5",
    name: "Phone Call Template",
    description: "Quick format for important phone conversations",
    icon: "Phone", 
    color: "teal",
    category: "Communication",
    fields: [
      "Caller Information",
      "Call Purpose",
      "Key Points Discussed",
      "Agreements Made",
      "Follow-up Required",
      "Next Contact Date"
    ],
    usageCount: 123,
    isPopular: false
  }
];

// Profile/User Data
export const mockUserProfile = {
  name: "Priya Sharma",
  email: "priya.sharma@example.com",
  avatar: null, // Will use initials
  joinDate: "March 2024",
  subscription: {
    plan: "Pro",
    status: "active",
    renewalDate: "October 15, 2024",
    features: [
      "Unlimited recordings",
      "Advanced AI analysis", 
      "Priority support",
      "Export to multiple formats",
      "Team collaboration"
    ]
  },
  usage: {
    recordingsThisMonth: 28,
    hoursThisMonth: 47.5,
    storageUsed: 2.1, // GB
    storageLimit: 10, // GB
    apiCallsUsed: 1250,
    apiCallsLimit: 5000
  },
  preferences: {
    defaultLanguage: "hi",
    autoTranscribe: true,
    emailNotifications: true,
    dataRetention: "1year", // 30days, 90days, 1year, forever
    shareAnalytics: false
  },
  statistics: {
    totalRecordings: 234,
    totalHours: 456.7,
    averageQuality: 94.2,
    topLanguages: ["Hindi", "English", "Tamil"],
    streak: 15 // days
  },
  achievements: [
    {
      id: "1",
      title: "First Recording",
      description: "Completed your first transcription",
      icon: "Award",
      date: "March 15, 2024",
      unlocked: true
    },
    {
      id: "2", 
      title: "Multilingual Master",
      description: "Used 5+ different languages",
      icon: "Globe",
      date: "April 2, 2024", 
      unlocked: true
    },
    {
      id: "3",
      title: "Power User", 
      description: "50+ recordings completed",
      icon: "Zap",
      date: "June 10, 2024",
      unlocked: true
    },
    {
      id: "4",
      title: "Consistency King",
      description: "30-day recording streak",
      icon: "Calendar", 
      date: null,
      unlocked: false
    }
  ]
};
