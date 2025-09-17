import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  FileText,
  Brain,
  Download,
  Globe,
  HardDrive,
  Activity,
  Calendar,
  Zap,
} from "lucide-react";
import { mockDashboardStats } from "../data/mockData";

export default function DashboardScreen() {
  const [stats] = useState(mockDashboardStats);
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const getActivityIcon = (type) => {
    const icons = {
      transcription: FileText,
      analysis: Brain,
      export: Download,
    };
    return icons[type] || FileText;
  };

  const getActivityColor = (type) => {
    const colors = {
      transcription: "text-blue-400",
      analysis: "text-purple-400",
      export: "text-green-400",
    };
    return colors[type] || "text-blue-400";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-muted-foreground">
            Your transcription analytics overview
          </p>
        </div>
        <div className="flex space-x-2">
          {["day", "week", "month"].map((period) => (
            <button
              key={period}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedPeriod === period
                  ? "bg-blue-600 text-white"
                  : "glassmorphism hover:bg-accent"
              }`}
              onClick={() => setSelectedPeriod(period)}
              data-testid={`period-${period}`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Recordings */}
        <div
          className="glassmorphism rounded-xl p-6"
          data-testid="stats-recordings"
        >
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 text-blue-400" />
            <div className="flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />+{stats.weeklyGrowth}%
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {formatNumber(stats.totalRecordings)}
          </div>
          <div className="text-sm text-muted-foreground">Total Recordings</div>
        </div>

        {/* Hours Transcribed */}
        <div className="glassmorphism rounded-xl p-6" data-testid="stats-hours">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-green-400" />
            <div className="flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8.5%
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {stats.hoursTranscribed}h
          </div>
          <div className="text-sm text-muted-foreground">Hours Transcribed</div>
        </div>

        {/* Average Accuracy */}
        <div
          className="glassmorphism rounded-xl p-6"
          data-testid="stats-accuracy"
        >
          <div className="flex items-center justify-between mb-4">
            <Zap className="w-8 h-8 text-yellow-400" />
            <div className="flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +2.1%
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {stats.averageAccuracy}%
          </div>
          <div className="text-sm text-muted-foreground">Average Accuracy</div>
        </div>

        {/* Storage Used */}
        <div
          className="glassmorphism rounded-xl p-6"
          data-testid="stats-storage"
        >
          <div className="flex items-center justify-between mb-4">
            <HardDrive className="w-8 h-8 text-purple-400" />
            <div className="text-sm text-muted-foreground">
              {stats.storageUsed}/{stats.storageLimit} GB
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {stats.storageUsed} GB
          </div>
          <div className="text-sm text-muted-foreground">Storage Used</div>
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div
              className="bg-purple-400 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(stats.storageUsed / stats.storageLimit) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transcription Trends Chart */}
        <div className="lg:col-span-2 glassmorphism rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
              Transcription Trends
            </h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-400 rounded mr-2" />
                Recordings
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded mr-2" />
                Hours
              </div>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="space-y-3" data-testid="trends-chart">
            {stats.transcriptionTrends.map((day, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-xs text-muted-foreground">
                  {day.date}
                </div>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <div className="w-full bg-muted rounded h-6 relative overflow-hidden">
                      <div
                        className="bg-blue-400 h-full rounded transition-all duration-500"
                        style={{ width: `${(day.recordings / 10) * 100}%` }}
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center px-2 text-xs font-medium text-white">
                      {day.recordings} recordings
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="w-full bg-muted rounded h-6 relative overflow-hidden">
                      <div
                        className="bg-green-400 h-full rounded transition-all duration-500"
                        style={{ width: `${(day.hours / 12) * 100}%` }}
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center px-2 text-xs font-medium text-white">
                      {day.hours}h
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glassmorphism rounded-xl p-6">
          <h3 className="text-lg font-semibold flex items-center mb-6">
            <Activity className="w-5 h-5 mr-2 text-green-400" />
            Recent Activity
          </h3>

          <div className="space-y-4" data-testid="recent-activity">
            {stats.recentActivity.map((activity) => {
              const ActivityIcon = getActivityIcon(activity.type);
              return (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-all duration-300"
                >
                  <div
                    className={`p-2 rounded-lg glassmorphism ${getActivityColor(
                      activity.type
                    )}`}
                  >
                    <ActivityIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{activity.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="w-full mt-4 py-2 text-center text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
            data-testid="view-all-activity"
          >
            View All Activity →
          </button>
        </div>
      </div>

      {/* Language Usage */}
      <div className="glassmorphism rounded-xl p-6">
        <h3 className="text-lg font-semibold flex items-center mb-6">
          <Globe className="w-5 h-5 mr-2 text-purple-400" />
          Language Usage
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Language Breakdown */}
          <div className="space-y-4" data-testid="language-breakdown">
            {stats.languageUsage.map((lang, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{lang.language}</span>
                  <span className="text-muted-foreground">
                    {lang.percentage}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">
              QUICK ACTIONS
            </h4>
            <div className="space-y-2">
              <button
                className="w-full flex items-center justify-between p-3 glassmorphism hover:bg-accent/50 rounded-lg transition-all duration-300"
                data-testid="export-analytics"
              >
                <div className="flex items-center space-x-3">
                  <Download className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Export Analytics</span>
                </div>
                <span className="text-xs text-muted-foreground">CSV</span>
              </button>

              <button
                className="w-full flex items-center justify-between p-3 glassmorphism hover:bg-accent/50 rounded-lg transition-all duration-300"
                data-testid="schedule-report"
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Schedule Report</span>
                </div>
                <span className="text-xs text-muted-foreground">Weekly</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
