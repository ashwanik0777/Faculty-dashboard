import { useState } from "react";
import {
  Heart,
  Brain,
  Dumbbell,
  Calendar,
  TrendingUp,
  Target,
  Award,
  Smile,
  Zap,
  Clock,
  Trophy,
  PersonStanding,
  GlassWater,
  Angry,
  Frown,
  Meh,
  Moon,
  Droplets,
} from "lucide-react";

const WellnessModule = () => {
  const [wellnessData] = useState({
    physicalHealth: 75,
    mentalWellness: 68,
    workLifeBalance: 60,
    stressLevel: 45, // Lower is better
  });

  const [activities] = useState([
    {
      id: 1,
      type: "Exercise",
      activity: "Morning Yoga",
      duration: "30 mins",
      mood: "calm",
      date: "2023-10-15",
      calories: 120,
    },
    {
      id: 2,
      type: "Mental",
      activity: "Meditation",
      duration: "15 mins",
      mood: "happy",
      date: "2023-10-14",
    },
    {
      id: 3,
      type: "Social",
      activity: "Team Lunch",
      duration: "1 hour",
      mood: "happy",
      date: "2023-10-13",
    },
  ]);

  const [goals] = useState([
    {
      id: 1,
      title: "Daily Steps",
      category: "Physical",
      current: 7500,
      target: 10000,
      unit: "steps",
    },
    {
      id: 2,
      title: "Meditation",
      category: "Mental",
      current: 4,
      target: 7,
      unit: "days",
    },
    {
      id: 3,
      title: "Water Intake",
      category: "Health",
      current: 5,
      target: 8,
      unit: "glasses",
    },
  ]);

  const [resources] = useState([
    {
      id: 1,
      title: "Mindfulness Workshop",
      type: "Workshop",
      date: "2023-11-05",
      duration: "2 hours",
      registrationOpen: true,
    },
    {
      id: 2,
      title: "Campus Yoga Classes",
      type: "Fitness",
      date: "Every Wednesday",
      duration: "1 hour",
      registrationOpen: false,
    },
    {
      id: 3,
      title: "Nutrition Counseling",
      type: "Health",
      date: "By appointment",
      duration: "30 mins",
      registrationOpen: true,
    },
  ]);

  // State for managing active tab
  const [activeTab, setActiveTab] = useState("dashboard");

  const getMoodIcon = (mood) => {
    switch (mood) {
      case "energetic":
        return <Zap className="h-6 w-6 text-yellow-500" />;
      case "calm":
        return <Smile className="h-6 w-6 text-blue-500" />;
      case "happy":
        return <Smile className="h-6 w-6 text-green-500" />;
      case "stressed":
        return <Angry className="h-6 w-6 text-red-500" />;
      case "tired":
        return <Moon className="h-6 w-6 text-gray-500" />;
      default:
        return <Meh className="h-6 w-6 text-gray-400" />;
    }
  };

  const getScoreColor = (score, isStress = false) => {
    if (isStress) {
      if (score <= 30) return "text-green-600";
      if (score <= 60) return "text-yellow-600";
      return "text-red-600";
    } else {
      if (score >= 80) return "text-green-600";
      if (score >= 60) return "text-yellow-600";
      return "text-red-600";
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500";
    return "bg-blue-500";
  };

  // Helper for common card styling
  const Card = ({ children, className = "" }) => (
    <div className={`rounded-lg  border-gray-200 bg-card text-card-foreground shadow-sm ${className}`}>
      {children}
    </div>
  );
  const CardHeader = ({ children, className = "" }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
  );
  const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  );
  const CardDescription = ({ children, className = "" }) => (
    <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
  );
  const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
  );

  // Helper for common button styling
  const Button = ({ children, onClick, variant = "default", size = "default", className = "", disabled = false }) => {
    let baseStyles = "inline-flex items-center  justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    let variantStyles = "";
    let sizeStyles = "";

    switch (variant) {
      case "outline":
        variantStyles = "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
        break;
      case "ghost":
        variantStyles = "hover:bg-accent hover:text-accent-foreground";
        break;
      case "default":
      default:
        variantStyles = "bg-primary bg-black text-white text-primary-foreground hover:bg-primary/90";
        break;
    }

    switch (size) {
      case "sm":
        sizeStyles = "h-8 px-3";
        break;
      case "lg":
        sizeStyles = "h-10 px-8";
        break;
      case "default":
      default:
        sizeStyles = "h-9 px-4 py-2";
        break;
    }

    return (
      <button
        onClick={onClick}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        disabled={disabled}
      >
        {children}
      </button>
    );
  };

  // Helper for Badge styling
  const Badge = ({ children, variant = "default", className = "" }) => {
    let baseStyles = "inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    let variantStyles = "";

    switch (variant) {
      case "outline":
        variantStyles = "text-foreground";
        break;
      case "default":
      default:
        variantStyles = "border-transparent bg-primary text-primary-foreground hover:bg-primary/80";
        break;
    }

    return (
      <span className={`${baseStyles} ${variantStyles} ${className}`}>
        {children}
      </span>
    );
  };

  // Helper for Tabs styling and functionality
  const Tabs = ({ defaultValue, children, className = "" }) => {
    return <div className={className}>{children}</div>;
  };

  const TabsList = ({ children, className = "" }) => {
    return (
      <div
        className={`inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground ${className}`}
        role="tablist"
      >
        {children}
      </div>
    );
  };

  const TabsTrigger = ({ value, children, className = "" }) => {
    const isActive = activeTab === value;
    return (
      <button
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-22 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive ? "bg-background text-foreground shadow" : "hover:bg-background hover:text-foreground"} ${className}`}
        onClick={() => setActiveTab(value)}
        role="tab"
        aria-selected={isActive}
        id={`tab-${value}`}
        aria-controls={`panel-${value}`}
      >
        {children}
      </button>
    );
  };

  const TabsContent = ({ value, children, className = "" }) => {
    const isActive = activeTab === value;
    return isActive ? (
      <div
        className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
        role="tabpanel"
        id={`panel-${value}`}
        aria-labelledby={`tab-${value}`}
      >
        {children}
      </div>
    ) : null;
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-blue-900">Wellness Dashboard</h1>
      <p className="text-gray-600">Track your health, wellness, and work-life balance</p>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Wellness Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 mx-auto mb-2 text-red-500" />
                <div className={`text-2xl font-bold ${getScoreColor(wellnessData.physicalHealth)}`}>
                  {wellnessData.physicalHealth}%
                </div>
                <div className="text-sm text-gray-600">Physical Health</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Brain className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <div className={`text-2xl font-bold ${getScoreColor(wellnessData.mentalWellness)}`}>
                  {wellnessData.mentalWellness}%
                </div>
                <div className="text-sm text-gray-600">Mental Wellness</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className={`text-2xl font-bold ${getScoreColor(wellnessData.workLifeBalance)}`}>
                  {wellnessData.workLifeBalance}%
                </div>
                <div className="text-sm text-gray-600">Work-Life Balance</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Smile className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className={`text-2xl font-bold ${getScoreColor(wellnessData.stressLevel, true)}`}>
                  {wellnessData.stressLevel}%
                </div>
                <div className="text-sm text-gray-600">Stress Level</div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Check-in */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Daily Wellness Check-in
              </CardTitle>
              <CardDescription>How are you feeling today?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                <Button variant="outline" className="h-16 flex items-center justify-center">
                  <Smile className="h-8 w-8 text-green-500" />
                </Button>
                <Button variant="outline" className="h-16 flex items-center justify-center">
                  <Meh className="h-8 w-8 text-gray-500" />
                </Button>
                <Button variant="outline" className="h-16 flex items-center justify-center">
                  <Frown className="h-8 w-8 text-blue-500" />
                </Button>
                <Button variant="outline" className="h-16 flex items-center justify-center">
                  <Angry className="h-8 w-8 text-red-500" />
                </Button>
                <Button variant="outline" className="h-16 flex items-center justify-center">
                  <Moon className="h-8 w-8 text-purple-500" />
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Energy Level (1-10)</label>
                  <input type="range" min="1" max="10" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Today's Highlights</label>
                  <textarea
                    className="w-full p-2 border border-gray-200 rounded-md h-20"
                    placeholder="What made your day better?"
                  ></textarea>
                </div>
                <Button className="w-full">Save Daily Check-in</Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Wellness Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div>{getMoodIcon(activity.mood)}</div>
                      <div>
                        <p className="font-medium">{activity.activity}</p>
                        <p className="text-sm text-gray-600">
                          {activity.type} • {activity.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{activity.date}</p>
                      {activity.calories && (
                        <p className="text-xs text-green-600">{activity.calories} cal</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Wellness Activities</h2>
            <Button>
              <Dumbbell className="h-4 w-4 mr-2" />
              Log New Activity
            </Button>
          </div>

          {/* Activity Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Dumbbell className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                <h3 className="font-medium mb-2">Physical Exercise</h3>
                <p className="text-sm text-gray-600">Walking, gym, sports, yoga</p>
                <Button className="mt-3 w-full" variant="outline">
                  Log Exercise
                </Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Brain className="h-8 w-8 mx-auto mb-3 text-purple-500" />
                <h3 className="font-medium mb-2">Mental Wellness</h3>
                <p className="text-sm text-gray-600">Meditation, mindfulness, reading</p>
                <Button className="mt-3 w-full" variant="outline">
                  Log Mental Activity
                </Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 mx-auto mb-3 text-red-500" />
                <h3 className="font-medium mb-2">Social & Recreation</h3>
                <p className="text-sm text-gray-600">Social time, hobbies, relaxation</p>
                <Button className="mt-3 w-full" variant="outline">
                  Log Social Activity
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Activity History */}
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>Your recent wellness activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>{getMoodIcon(activity.mood)}</div>
                      <div>
                        <h3 className="font-medium">{activity.activity}</h3>
                        <p className="text-sm text-gray-600">
                          {activity.type} • {activity.duration}
                        </p>
                        <Badge variant="outline" className="mt-1">
                          Mood: {activity.mood}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{activity.date}</p>
                      {activity.calories && (
                        <p className="text-sm text-green-600">{activity.calories} calories</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Wellness Goals</h2>
            <Button>
              <Target className="h-4 w-4 mr-2" />
              Set New Goal
            </Button>
          </div>

          <div className="space-y-4">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">{goal.title}</h3>
                      <Badge variant="outline">{goal.category}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">
                        {goal.current}/{goal.target} {goal.unit}
                      </p>
                      <p className="text-xs text-gray-600">
                        {Math.round((goal.current / goal.target) * 100)}% complete
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${getProgressColor((goal.current / goal.target) * 100)}`}
                      style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Goal Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Set New Wellness Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Goal Category</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Physical Fitness</option>
                    <option>Mental Health</option>
                    <option>Work-Life Balance</option>
                    <option>Social Wellness</option>
                    <option>Sleep Quality</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Goal Type</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Daily Steps</option>
                    <option>Exercise Minutes</option>
                    <option>Meditation Days</option>
                    <option>Sleep Hours</option>
                    <option>Water Intake</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Target Value</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g., 8000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Time Period</label>
                  <select className="w-full p-2 border border-gray-200 rounded-md">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
              </div>
              <Button className="w-full text-white bg-black">Create Goal</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Wellness Resources</h2>
            <Button variant="outline">View All Programs</Button>
          </div>

          <div className="space-y-4">
            {resources.map((resource) => (
              <Card key={resource.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-2">{resource.title}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          <strong>Type:</strong> {resource.type}
                        </p>
                        <p>
                          <strong>Date:</strong> {resource.date}
                        </p>
                        <p>
                          <strong>Duration:</strong> {resource.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {resource.registrationOpen ? (
                        <Badge className="bg-green-100 text-green-800 mb-2">Open for Registration</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800 mb-2">Registration Closed</Badge>
                      )}
                      <br />
                      <Button size="sm" disabled={!resource.registrationOpen}>
                        {resource.registrationOpen ? "Register" : "Waitlist"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access Resources */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Brain className="h-8 w-8 mx-auto mb-3 text-purple-500" />
                <h3 className="font-medium mb-2">Mental Health Resources</h3>
                <Button variant="outline" className="w-full">
                  Access Resources
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 mx-auto mb-3 text-red-500" />
                <h3 className="font-medium mb-2">Health Checkup Booking</h3>
                <Button variant="outline" className="w-full">
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Dumbbell className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                <h3 className="font-medium mb-2">Fitness Center Access</h3>
                <Button variant="outline" className="w-full">
                  View Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Wellness Insights & Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">This Week's Highlights</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Exercise Sessions:</span>
                      <span className="font-medium text-green-600">5 sessions</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Meditation Minutes:</span>
                      <span className="font-medium text-purple-600">180 minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Mood:</span>
                      <span className="font-medium text-blue-600 flex items-center">
                        Happy <Smile className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Stress Level:</span>
                      <span className="font-medium text-green-600">Low</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Recommendations</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-blue-50 rounded flex items-center">
                      <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                      Increase water intake by 2 glasses daily
                    </div>
                    <div className="p-2 bg-green-50 rounded flex items-center">
                      <PersonStanding className="h-4 w-4 mr-2 text-green-500" />
                      Great job on daily walks! Keep it up
                    </div>
                    <div className="p-2 bg-yellow-50 rounded flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                      Consider earlier bedtime for better sleep
                    </div>
                    <div className="p-2 bg-purple-50 rounded flex items-center">
                      <Brain className="h-4 w-4 mr-2 text-purple-500" />
                      Try increasing meditation to 20 minutes
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Achievements & Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 border border-gray-200 rounded-lg">
                  <PersonStanding className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-sm font-medium">Step Master</div>
                  <div className="text-xs text-gray-600">10,000 steps in a day</div>
                </div>
                <div className="text-center p-3 border border-gray-200 rounded-lg">
                  <Brain className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-sm font-medium">Mindful Week</div>
                  <div className="text-xs text-gray-600">7 days of meditation</div>
                </div>
                <div className="text-center p-3 border border-gray-200 rounded-lg opacity-50">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <div className="text-sm font-medium">Wellness Champion</div>
                  <div className="text-xs text-gray-600">30-day streak</div>
                </div>
                <div className="text-center p-3 border border-gray-200 rounded-lg opacity-50">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <div className="text-sm font-medium">Energy Booster</div>
                  <div className="text-xs text-gray-600">High energy for 5 days</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WellnessModule;