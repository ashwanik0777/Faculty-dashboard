import React, { useState } from "react";
import {
  Lightbulb,
  Plus,
  Users,
  Calendar,
  Upload,
  FileText,
  Target,
  TrendingUp,
  Award,
  MessageSquare,
  Clock,
  CheckCircle,
} from "lucide-react";

const StartupModule = () => {
  const [activeTab, setActiveTab] = useState("dashboard"); // State to manage active tab

  const [activeStartups] = useState([
    {
      id: 1,
      title: "Smart Campus IoT Network",
      domain: "IoT & Smart Systems",
      status: "Approved",
      progress: 45,
      nextMilestone: "Prototype Testing",
      dueDate: "2023-11-15",
      teamMembers: ["Prof. Sharma", "Rahul K.", "Priya M."],
    },
    {
      id: 2,
      title: "AI-Based Learning Assistant",
      domain: "Artificial Intelligence",
      status: "Incubated",
      progress: 75,
      nextMilestone: "Beta Launch",
      dueDate: "2023-12-01",
      teamMembers: ["Prof. Gupta", "Anjali S.", "Vikram P.", "Neha R."],
    },
    {
      id: 3,
      title: "Eco-Friendly Lab Equipment",
      domain: "Sustainability",
      status: "Submitted",
      progress: 10,
      nextMilestone: "Feasibility Report",
      dueDate: "2024-01-20",
      teamMembers: ["Prof. Singh", "Arun T."],
    },
  ]);

  const [dailyLogs] = useState([
    {
      date: "2023-10-15",
      startupId: 1,
      activity: "Completed sensor node assembly for Phase 1 deployment",
      blocker: "Delay in component delivery",
      nextSteps: "Begin calibration testing",
    },
    {
      date: "2023-10-14",
      startupId: 2,
      activity: "Refined NLP algorithms for better student query understanding",
      blocker: "None",
      nextSteps: "Prepare test dataset for evaluation",
    },
    {
      date: "2023-10-12",
      startupId: 3,
      activity: "Conducted initial market survey with 50 respondents",
      blocker: "Need more diverse sample",
      nextSteps: "Expand survey to other departments",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-100 text-blue-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Incubated":
        return "bg-purple-100 text-purple-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // --- Helper Components (mimicking Shadcn UI) ---

  // Card Component
  const Card = ({ children, className = "" }) => (
    <div className={`rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm ${className}`}>
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

  // Button Component
  const Button = ({ variant = "default", size = "default", className = "", onClick, children, disabled = false }) => {
    let baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    let variantStyles = "";
    let sizeStyles = "";

    switch (variant) {
      case "default":
        variantStyles = "bg-primary text-primary-foreground hover:bg-primary/90";
        break;
      case "outline":
        variantStyles = "border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground";
        break;
      // Add other variants if needed
    }

    switch (size) {
      case "default":
        sizeStyles = "h-10 px-4 py-2";
        break;
      case "sm":
        sizeStyles = "h-9 rounded-md px-3";
        break;
      // Add other sizes if needed
    }

    return (
      <button
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  };

  // Badge Component
  const Badge = ({ className = "", children }) => (
    <span className={`inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  );

  // Tabs Components
  const Tabs = ({ value, onValueChange, className = "", children }) => {
    return (
      <div className={className}>
        {React.Children.map(children, child => {
          if (child.type === TabsList) {
            return React.cloneElement(child, { onTabChange: onValueChange, currentTab: value });
          }
          if (child.type === TabsContent) {
            return React.cloneElement(child, { currentTab: value, key: child.props.value });
          }
          return child;
        })}
      </div>
    );
  };

  const TabsList = ({ onTabChange, currentTab, className = "", children }) => (
    <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { onClick: () => onTabChange(child.props.value), isActive: currentTab === child.props.value })
      )}
    </div>
  );

  const TabsTrigger = ({ value, onClick, isActive, children }) => (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-17 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${isActive ? 'bg-white text-foreground shadow-sm' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  const TabsContent = ({ value, currentTab, className = "", children }) => (
    <div className={`${currentTab === value ? '' : 'hidden'} mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}>
      {children}
    </div>
  );

  // Input Component
  const Input = ({ className = "", type = "text", value, onChange, placeholder }) => (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );

  // Textarea Component
  const Textarea = ({ className = "", value, onChange, placeholder, rows }) => (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
    ></textarea>
  );

  // Progress Component
  const Progress = ({ value, className = "" }) => (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-secondary ${className}`}>
      <div
        className="h-full bg-primary transition-all"
        style={{ width: `${value || 0}%` }}
      />
    </div>
  );

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-900">Faculty Startup & Innovation</h1>
        <Button onClick={() => setActiveTab("proposals")}> {/* Direct tab switch */}
          <Plus className="h-4 w-4 mr-2" />
          New Proposal
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="proposals">Submit Proposal</TabsTrigger>
          <TabsTrigger value="track">Track Startups</TabsTrigger>
          <TabsTrigger value="daily-log">Daily Log</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Active Startups</div>
                <Lightbulb className="h-6 w-6 mx-auto mt-2 text-blue-600" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">2</div>
                <div className="text-sm text-gray-600">Incubated</div>
                <Award className="h-6 w-6 mx-auto mt-2 text-green-600" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">₹8.5L</div>
                <div className="text-sm text-gray-600">Total Funding</div>
                <TrendingUp className="h-6 w-6 mx-auto mt-2 text-purple-600" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">7</div>
                <div className="text-sm text-gray-600">Team Members</div>
                <Users className="h-6 w-6 mx-auto mt-2 text-orange-600" />
              </CardContent>
            </Card>
          </div>

          {/* Active Startups Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Active Startup Projects</CardTitle>
              <CardDescription>Overview of your current startup initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeStartups.map((startup) => (
                  <div key={startup.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{startup.title}</h3>
                        <p className="text-sm text-gray-600">{startup.domain}</p>
                      </div>
                      <Badge className={getStatusColor(startup.status)}>
                        {startup.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <span className="text-sm text-gray-500">Progress</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <Progress value={startup.progress} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{startup.progress}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Next Milestone</span>
                        <p className="text-sm font-medium">{startup.nextMilestone}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Due Date</span>
                        <p className="text-sm font-medium">{startup.dueDate}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500">Team: </span>
                        <span className="text-sm">{startup.teamMembers.length} members</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm">Update Progress</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proposals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit New Startup Proposal</CardTitle>
              <CardDescription>Create a comprehensive proposal for your startup idea</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Startup Title</label>
                  <Input placeholder="Enter your startup name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Domain</label>
                  <select className="w-full p-2 border border-gray-200 rounded-md">
                    <option>Education Technology</option>
                    <option>Healthcare</option>
                    <option>FinTech</option>
                    <option>IoT & Smart Systems</option>
                    <option>Artificial Intelligence</option>
                    <option>Sustainability</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Objective & Vision</label>
                <Textarea
                  placeholder="Describe your startup's objective, vision, and the problem it solves"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Timeline (Months)</label>
                  <Input type="number" placeholder="Project duration" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Estimated Budget</label>
                  <Input placeholder="₹ Total budget required" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Team Members</label>
                <div className="space-y-2">
                  <Input placeholder="Faculty Member 1 (Lead)" />
                  <Input placeholder="Student Member 1" />
                  <Input placeholder="Student Member 2" />
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add More Members
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Market Research & Feasibility</label>
                <Textarea
                  placeholder="Include market analysis, target audience, competition, and feasibility study"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Technical Approach</label>
                <Textarea
                  placeholder="Describe the technical methodology, tools, and technologies to be used"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Expected Outcomes & Impact</label>
                <Textarea
                  placeholder="What are the expected deliverables and societal/economic impact?"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Supporting Documents</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Business Plan
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Technical Design
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Market Research
                  </Button>
                </div>
              </div>

              <Button className="w-full">Submit Proposal to Innovation Cell</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="track" className="space-y-6">
          {/* Kanban Style Status Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Startup Status Tracker</CardTitle>
              <CardDescription>Kanban-style tracking of all your startup proposals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Submitted */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-center p-2 bg-blue-100 text-blue-800 rounded">
                    Submitted ({activeStartups.filter(s => s.status === "Submitted").length})
                  </h3>
                  {activeStartups.filter(s => s.status === "Submitted").map(startup => (
                    <Card key={startup.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-3">
                        <h4 className="font-medium text-sm">{startup.title}</h4>
                        <p className="text-xs text-gray-600">Submitted-{startup.dueDate.substring(5)}</p> {/* Simplified date */}
                        <Badge variant="outline" className="mt-2">Under Review</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Approved */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-center p-2 bg-green-100 text-green-800 rounded">
                    Approved ({activeStartups.filter(s => s.status === "Approved").length})
                  </h3>
                  {activeStartups.filter(s => s.status === "Approved").map(startup => (
                    <Card key={startup.id} className="border-l-4 border-l-green-500">
                      <CardContent className="p-3">
                        <h4 className="font-medium text-sm">{startup.title}</h4>
                        <p className="text-xs text-gray-600">Progress: {startup.progress}%</p>
                        <Badge variant="outline" className="mt-2">Next: {startup.nextMilestone}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Incubated */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-center p-2 bg-purple-100 text-purple-800 rounded">
                    Incubated ({activeStartups.filter(s => s.status === "Incubated").length})
                  </h3>
                  {activeStartups.filter(s => s.status === "Incubated").map(startup => (
                    <Card key={startup.id} className="border-l-4 border-l-purple-500">
                      <CardContent className="p-3">
                        <h4 className="font-medium text-sm">{startup.title}</h4>
                        <p className="text-xs text-gray-600">Funding: ₹5.2L secured</p> {/* Hardcoded for example */}
                        <Badge variant="outline" className="mt-2">Active Development</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Completed (Example static card) */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-center p-2 bg-gray-100 text-gray-800 rounded">
                    Completed (1)
                  </h3>
                  <Card className="border-l-4 border-l-gray-500">
                    <CardContent className="p-3">
                      <h4 className="font-medium text-sm">GBU Connect App</h4>
                      <p className="text-xs text-gray-600">Completed-03-15</p>
                      <Badge variant="outline" className="mt-2">Success</Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily-log" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add New Log */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2 text-blue-600" />
                  Add Daily Activity Log
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Startup</label>
                  <select className="w-full p-2 border border-gray-200 rounded-md">
                    {activeStartups.map(startup => (
                      <option key={startup.id} value={startup.id}>{startup.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Today's Activity</label>
                  <Textarea
                    placeholder="What did you accomplish today?"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Blockers/Challenges</label>
                  <Textarea
                    placeholder="Any challenges or blockers faced?"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Next Steps</label>
                  <Textarea
                    placeholder="What are the next planned activities?"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Attach Files</label>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Documents/Reports
                  </Button>
                </div>
                <Button className="w-full">Save Daily Log</Button>
              </CardContent>
            </Card>

            {/* Recent Logs */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailyLogs.map((log, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{log.date}</h4>
                        <Badge variant="outline">
                          {activeStartups.find(s => s.id === log.startupId)?.title}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-500">Activity:</span>
                          <p>{log.activity}</p>
                        </div>
                        {log.blocker && log.blocker !== "None" && (
                          <div>
                            <span className="text-red-500">Blocker:</span>
                            <p>{log.blocker}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-blue-500">Next Steps:</span>
                          <p>{log.nextSteps}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-600" />
                Collaboration Hub
              </CardTitle>
              <CardDescription>Connect with students and other faculty for joint projects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Collaboration Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Student Collaboration</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Joint startup projects with your students
                    </p>
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      View Student Projects
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Cross-Department</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Collaborate across different departments
                    </p>
                    <Button variant="outline" className="w-full">
                      <Users className="h-4 w-4 mr-2" />
                      Find Collaborators
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Admin Panel Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Proposal Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
                      <div>
                        <h4 className="font-medium">Forward to Innovation Cell</h4>
                        <p className="text-sm text-gray-600">Submit completed proposals for review</p>
                      </div>
                      <Button>Forward</Button>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded">
                      <div>
                        <h4 className="font-medium">Submit to Dean's Office</h4>
                        <p className="text-sm text-gray-600">High-value proposals requiring dean approval</p>
                      </div>
                      <Button variant="outline">Submit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StartupModule;
