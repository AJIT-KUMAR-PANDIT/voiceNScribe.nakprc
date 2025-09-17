import { useState } from "react";
import {
  User,
  Settings,
  Crown,
  Calendar,
  BarChart3,
  Shield,
  Award,
  Globe,
  Flame,
  Edit3,
  Camera,
  CheckCircle,
  Clock,
  FileText,
  Languages,
  TrendingUp,
  Lock,
  Download,
  Trash2,
  Bell,
  Eye,
  EyeOff,
} from "lucide-react";
import { mockUserProfile } from "../data/mockData";

export default function ProfileScreen() {
  const [profile] = useState(mockUserProfile);
  const [activeTab, setActiveTab] = useState("overview");
  const [showDataOptions, setShowDataOptions] = useState(false);
  const [notifications, setNotifications] = useState(
    profile.preferences.emailNotifications
  );

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const getAchievementIcon = (icon) => {
    const icons = {
      Award,
      Globe,
      Flame: Flame,
      Calendar,
    };
    return icons[icon] || Award;
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "statistics", label: "Statistics", icon: BarChart3 },
    { id: "subscription", label: "Subscription", icon: Crown },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "privacy", label: "Privacy", icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="glassmorphism rounded-xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                {getInitials(profile.name)}
              </div>
              <button
                className="absolute -bottom-2 -right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300"
                data-testid="edit-avatar"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <span>{profile.name}</span>
                {profile.subscription.plan === "Pro" && (
                  <Crown className="w-5 h-5 text-yellow-400" />
                )}
              </h2>
              <p className="text-muted-foreground">{profile.email}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {profile.joinDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>{profile.statistics.streak} day streak</span>
                </div>
              </div>
            </div>
          </div>
          <button
            className="px-4 py-2 glassmorphism hover:bg-accent rounded-lg transition-all duration-300 flex items-center"
            data-testid="edit-profile"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            className="text-center p-4 glassmorphism rounded-lg"
            data-testid="stat-recordings"
          >
            <div className="text-2xl font-bold text-blue-400">
              {formatNumber(profile.statistics.totalRecordings)}
            </div>
            <div className="text-sm text-muted-foreground">
              Total Recordings
            </div>
          </div>
          <div
            className="text-center p-4 glassmorphism rounded-lg"
            data-testid="stat-hours"
          >
            <div className="text-2xl font-bold text-green-400">
              {profile.statistics.totalHours}h
            </div>
            <div className="text-sm text-muted-foreground">Total Hours</div>
          </div>
          <div
            className="text-center p-4 glassmorphism rounded-lg"
            data-testid="stat-accuracy"
          >
            <div className="text-2xl font-bold text-yellow-400">
              {profile.statistics.averageQuality}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Quality</div>
          </div>
          <div
            className="text-center p-4 glassmorphism rounded-lg"
            data-testid="stat-languages"
          >
            <div className="text-2xl font-bold text-purple-400">
              {profile.statistics.topLanguages.length}
            </div>
            <div className="text-sm text-muted-foreground">Languages</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="glassmorphism rounded-xl p-2">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "hover:bg-accent"
                }`}
                onClick={() => setActiveTab(tab.id)}
                data-testid={`tab-${tab.id}`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="glassmorphism rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3" data-testid="recent-activity">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent/50">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="font-medium">Transcribed team meeting</div>
                    <div className="text-sm text-muted-foreground">
                      2 hours ago
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent/50">
                  <Languages className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="font-medium">Used Hindi template</div>
                    <div className="text-sm text-muted-foreground">
                      5 hours ago
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent/50">
                  <Award className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="font-medium">Earned "Power User" badge</div>
                    <div className="text-sm text-muted-foreground">
                      1 day ago
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="glassmorphism rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Achievements</h3>
              <div className="space-y-3" data-testid="achievements">
                {profile.achievements.map((achievement) => {
                  const AchievementIcon = getAchievementIcon(achievement.icon);
                  return (
                    <div
                      key={achievement.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        achievement.unlocked
                          ? "bg-green-500/20"
                          : "bg-accent/50"
                      }`}
                    >
                      <AchievementIcon
                        className={`w-5 h-5 ${
                          achievement.unlocked
                            ? "text-green-400"
                            : "text-muted-foreground"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {achievement.description}
                        </div>
                      </div>
                      {achievement.unlocked && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === "statistics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                className="glassmorphism rounded-xl p-6 text-center"
                data-testid="monthly-recordings"
              >
                <FileText className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold">
                  {profile.usage.recordingsThisMonth}
                </div>
                <div className="text-sm text-muted-foreground">This Month</div>
              </div>
              <div
                className="glassmorphism rounded-xl p-6 text-center"
                data-testid="monthly-hours"
              >
                <Clock className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold">
                  {profile.usage.hoursThisMonth}h
                </div>
                <div className="text-sm text-muted-foreground">
                  Hours This Month
                </div>
              </div>
              <div
                className="glassmorphism rounded-xl p-6 text-center"
                data-testid="api-usage"
              >
                <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-2xl font-bold">
                  {formatNumber(profile.usage.apiCallsUsed)}
                </div>
                <div className="text-sm text-muted-foreground">
                  API Calls Used
                </div>
              </div>
              <div
                className="glassmorphism rounded-xl p-6 text-center"
                data-testid="storage-usage"
              >
                <HardDrive className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold">
                  {profile.usage.storageUsed} GB
                </div>
                <div className="text-sm text-muted-foreground">
                  Storage Used
                </div>
              </div>
            </div>

            <div className="glassmorphism rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Top Languages</h3>
              <div className="space-y-3">
                {profile.statistics.topLanguages.map((language, index) => (
                  <div
                    key={language}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-xs text-white font-bold">
                        {index + 1}
                      </div>
                      <span>{language}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Subscription Tab */}
        {activeTab === "subscription" && (
          <div className="space-y-6">
            <div className="glassmorphism rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold flex items-center space-x-2">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <span>{profile.subscription.plan} Plan</span>
                  </h3>
                  <p className="text-muted-foreground">
                    Status:{" "}
                    <span className="text-green-400 capitalize">
                      {profile.subscription.status}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">
                    Next billing
                  </div>
                  <div className="font-semibold">
                    {profile.subscription.renewalDate}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Plan Features</h4>
                  <div className="space-y-2">
                    {profile.subscription.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Usage Limits</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>API Calls</span>
                        <span>
                          {formatNumber(profile.usage.apiCallsUsed)}/
                          {formatNumber(profile.usage.apiCallsLimit)}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              (profile.usage.apiCallsUsed /
                                profile.usage.apiCallsLimit) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Storage</span>
                        <span>
                          {profile.usage.storageUsed}/
                          {profile.usage.storageLimit} GB
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-purple-400 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              (profile.usage.storageUsed /
                                profile.usage.storageLimit) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
                  data-testid="manage-subscription"
                >
                  Manage Subscription
                </button>
                <button
                  className="px-4 py-2 glassmorphism hover:bg-accent rounded-lg transition-all duration-300"
                  data-testid="billing-history"
                >
                  Billing History
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="glassmorphism rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Preferences</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive updates about your transcriptions
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                      data-testid="email-notifications-toggle"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Data Retention
                  </label>
                  <select
                    className="w-full bg-accent text-foreground rounded-lg px-3 py-2 border border-border focus:ring-2 focus:ring-blue-400 transition-all"
                    defaultValue={profile.preferences.dataRetention}
                    data-testid="data-retention-select"
                  >
                    <option value="30days">30 Days</option>
                    <option value="90days">90 Days</option>
                    <option value="1year">1 Year</option>
                    <option value="forever">Forever</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === "privacy" && (
          <div className="space-y-6">
            <div className="glassmorphism rounded-xl p-6">
              <h3 className="text-lg font-semibold flex items-center mb-4">
                <Shield className="w-5 h-5 mr-2" />
                Data Management
              </h3>

              <div className="space-y-4">
                <button
                  className="w-full flex items-center justify-between p-4 glassmorphism hover:bg-accent/50 rounded-lg transition-all duration-300"
                  onClick={() => setShowDataOptions(!showDataOptions)}
                  data-testid="data-options-toggle"
                >
                  <div className="flex items-center space-x-3">
                    {showDataOptions ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                    <div className="text-left">
                      <div className="font-medium">Data Options</div>
                      <div className="text-sm text-muted-foreground">
                        Manage your data and privacy settings
                      </div>
                    </div>
                  </div>
                </button>

                {showDataOptions && (
                  <div className="space-y-3 ml-8 pl-4 border-l-2 border-border">
                    <button
                      className="w-full flex items-center justify-between p-3 bg-accent hover:bg-accent/80 rounded-lg transition-all duration-300"
                      data-testid="export-all-data"
                    >
                      <div className="flex items-center space-x-3">
                        <Download className="w-4 h-4 text-blue-400" />
                        <div className="text-left">
                          <div className="font-medium">Export All Data</div>
                          <div className="text-sm text-muted-foreground">
                            Download all your data in JSON format
                          </div>
                        </div>
                      </div>
                    </button>

                    <button
                      className="w-full flex items-center justify-between p-3 bg-accent hover:bg-accent/80 rounded-lg transition-all duration-300"
                      data-testid="delete-all-data"
                    >
                      <div className="flex items-center space-x-3">
                        <Trash2 className="w-4 h-4 text-red-400" />
                        <div className="text-left">
                          <div className="font-medium">Delete All Data</div>
                          <div className="text-sm text-muted-foreground">
                            Permanently remove all transcriptions and data
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-accent/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Lock className="w-4 h-4 text-green-400" />
                  <span className="font-medium text-green-400">
                    Privacy Protected
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your data is encrypted and stored securely. We never share
                  your personal information with third parties.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
