import React, { useState } from "react";
import { 
  User, 
  BookOpen, 
  FileText, 
  Award, 
  GraduationCap, 
  Calendar, 
  Bell, 
  Plus 
} from "lucide-react";

// Utility function for class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Card Components
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg bg-white text-card-foreground shadow-sm border border-gray-200",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// Button Component
const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  asChild = false, 
  ...props 
}, ref) => {
  const Comp = asChild ? 'span' : "button";
  
  const variants = {
    default: "bg-blue-600 border border-gray-200 text-white hover:bg-blue-700",
    destructive: "bg-red-600 border border-gray-200 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-50",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    ghost: "hover:bg-gray-100 border border-gray-200 hover:text-gray-900",
    link: "text-blue-600 border border-gray-200 underline-offset-4 hover:underline",
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };
  
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// Input Component
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

// Label Component
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    {...props}
  />
));
Label.displayName = "Label";

// Textarea Component
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

// Badge Component
const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-blue-100 text-blue-800 border-transparent",
    secondary: "bg-gray-100 text-gray-800 border-gray-200",
    destructive: "bg-red-100 text-red-800 border-transparent",
    outline: "text-gray-800 border border-gray-300",
  };
  
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

// Tabs Components
const Tabs = ({ defaultValue, className, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={cn("w-full", className)}>
      {React.Children.map(children, (child) => {
        if (child.type.displayName === "TabsList") {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        if (child.type.displayName === "TabsContent") {
          return React.cloneElement(child, { activeTab });
        }
        return child;
      })}
    </div>
  );
};
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef(({ 
  className, 
  activeTab, 
  setActiveTab, 
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-10  items-center gap-30 justify-center rounded-md bg-gray-100 p-4 text-gray-500",
      className
    )}
    {...props}
  >
    {React.Children.map(props.children, (child) => {
      return React.cloneElement(child, { 
        activeTab, 
        setActiveTab 
      });
    })}
  </div>
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(({ 
  className, 
  value, 
  activeTab, 
  setActiveTab, 
  ...props 
}, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      activeTab === value 
        ? "bg-white px-20 text-gray-900 shadow-sm" 
        : "hover:text-gray-900",
      className
    )}
    onClick={() => setActiveTab(value)}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ 
  className, 
  value, 
  activeTab, 
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      activeTab !== value ? "hidden" : "block",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

// Avatar Components
const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-gray-100",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

// Progress Component
const Progress = React.forwardRef(({ className, value = 0, ...props }, ref) => {
  const progressValue = Math.min(100, Math.max(0, value || 0));
  
  return (
    <div
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      role="progressbar"
      aria-valuenow={progressValue}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <div
        className="h-full w-full bg-blue-600"
        style={{
          transform: `translateX(-${100 - progressValue}%)`,
          transition: 'transform 400ms cubic-bezier(0.65, 0, 0.35, 1)'
        }}
      />
    </div>
  );
});
Progress.displayName = "Progress";

// Main FacultyProfile Component
const FacultyProfile = () => {
  const [scholars] = useState([
    {
      id: 1,
      name: "Amit Sharma",
      program: "PhD in Computer Science",
      started: "2021",
      currentPhase: "Mid Review",
      topic: "Machine Learning Applications in Education Technology",
      progress: 65,
      nextReview: "15 Oct 2024",
      meetings: [
        {
          date: "10 Sep 2024",
          summary: "Discussed progress on literature review and initial findings",
          target: "Complete chapter 3 draft by next meeting"
        },
        {
          date: "25 Aug 2024",
          summary: "Reviewed methodology section",
          target: "Implement first phase of experiments"
        }
      ]
    },
    {
      id: 2,
      name: "Priya Patel",
      program: "PhD in Data Science",
      started: "2022",
      currentPhase: "Proposal",
      topic: "Big Data Analytics for Healthcare Systems",
      progress: 30,
      nextReview: "5 Nov 2024",
      meetings: [
        {
          date: "15 Sep 2024",
          summary: "Finalized research questions and objectives",
          target: "Complete proposal draft by next meeting"
        }
      ]
    }
  ]);

  const getPhaseColor = (phase) => {
    switch (phase) {
      case "Coursework":
        return "bg-blue-100 text-blue-800";
      case "Proposal":
        return "bg-yellow-100 text-yellow-800";
      case "Mid Review":
        return "bg-orange-100 text-orange-800";
      case "Final Submission":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-3 p-4 sm:p-6 max-w-screen-2xl mx-auto">
      {/* Main Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 leading-tight">
            Faculty Profile
          </h1>
          <p className="text-sm text-gray-500">Manage your professional information and activities</p>
        </div>
        <Button className="w-full sm:w-auto min-w-[150px]">Edit Profile</Button>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="overview">
        <TabsList className="w-full grid grid-cols-2 sm:grid-cols-5 gap-2">
          <TabsTrigger value="overview" className="py-2 text-xs sm:text-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="academic" className="py-2 text-xs sm:text-sm">
            Academic
          </TabsTrigger>
          <TabsTrigger value="research" className="py-2 text-xs sm:text-sm">
            Research
          </TabsTrigger>
          <TabsTrigger value="scholars" className="py-2 text-xs sm:text-sm">
            Scholars
          </TabsTrigger>
          <TabsTrigger value="achievements" className="py-2 text-xs sm:text-sm">
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="pt-6 pb-6 px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Personal Information Card */}
          <Card className="border border-gray-300">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
                <User className="h-6 w-6 text-blue-600" />
                <span className="leading-snug">Personal Information</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Avatar Column */}
                <div className="flex flex-col items-center w-full lg:w-auto space-y-4">
                  <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border border-gray-300">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-2xl">RK</AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full max-w-[200px] hover:bg-gray-50 transition-colors"
                  >
                    Change Photo
                  </Button>
                </div>
                
                {/* Form Fields */}
                <div className="flex-1 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { label: "Full Name", value: "Dr. Rajesh Kumar" },
                      { label: "Designation", value: "Associate Professor" },
                      { label: "Department", value: "Computer Science" },
                      { label: "Employee ID", value: "FAC001234" },
                      { label: "Email", value: "rajesh.kumar@gbu.ac.in" },
                      { label: "Phone", value: "+91 98765 43210", editable: true }
                    ].map((field, index) => (
                      <div key={index} className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          {field.label}
                        </Label>
                        <Input 
                          value={field.value} 
                          className="h-10 border border-gray-300 bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Address
                    </Label>
                    <Textarea 
                      value="123 Faculty Quarters, GBU Campus, Greater Noida"
                      className="min-h-[100px] border border-gray-400 bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Assignments Card */}
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                Current Assignments
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    title: "Course Assignments",
                    icon: <BookOpen className="h-4 w-4 text-blue-500" />,
                    items: [
                      "Data Structures (CS-201)",
                      "Machine Learning (CS-401)", 
                      "Research Methodology (CS-501)"
                    ]
                  },
                  {
                    title: "Administrative Roles",
                    icon: <User className="h-4 w-4 text-green-500" />,
                    items: [
                      "IQAC Member",
                      "Research Committee",
                      "Placement Committee"
                    ]
                  },
                  {
                    title: "Mentorship",
                    icon: <GraduationCap className="h-4 w-4 text-purple-500" />,
                    items: [
                      "15 M.Tech Students",
                      "3 PhD Scholars",
                      "Tech Club Mentor"
                    ]
                  }
                ].map((section, index) => (
                  <div 
                    key={index}
                    className="p-5 border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                  >
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      {section.icon}
                      {section.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Tab */}
        <TabsContent value="academic" className="space-y-6 pt-6">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <BookOpen className="h-5 w-5 text-green-600" />
                <span>Teaching Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-blue-600">8</div>
                  <div className="text-sm text-gray-600">Years of Experience</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-gray-600">Courses Taught</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-purple-600">450+</div>
                  <div className="text-sm text-gray-600">Students Mentored</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Current Semester Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Data Structures", "Machine Learning", "Research Methodology"].map((course, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg flex flex-col sm:flex-row justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{course}</h3>
                      <p className="text-sm text-gray-600">CS-{201 + index * 100} • Semester {3 + index * 2}</p>
                    </div>
                    <div className="sm:text-right">
                      <Badge variant="secondary">Active</Badge>
                      <p className="text-sm text-gray-600 mt-1">{30 + index * 5} Students</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Research Tab */}
        <TabsContent value="research" className="space-y-6 pt-6">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <FileText className="h-5 w-5 text-purple-600" />
                <span>Research Contributions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-blue-600">15</div>
                  <div className="text-sm text-gray-600">Publications</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-green-600">5</div>
                  <div className="text-sm text-gray-600">Patents</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-yellow-600">8</div>
                  <div className="text-sm text-gray-600">Conferences</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-purple-600">3</div>
                  <div className="text-sm text-gray-600">Ongoing Projects</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Recent Publications</h3>
                {[
                  "Machine Learning Applications in Education - IEEE Conference 2024",
                  "Data Mining Techniques for Student Performance Analysis - ACM Journal 2023",
                  "AI-Driven Campus Management Systems - Springer 2023"
                ].map((publication, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium">{publication}</h4>
                    <p className="text-sm text-gray-600 mt-1">Rajesh Kumar, et al.</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scholars Tab */}
        <TabsContent value="scholars" className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-blue-900">Research Scholars</h2>
              <p className="text-sm text-gray-600 mt-1">Manage and track your research scholars</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Scholar
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Active Scholars</div>
                <GraduationCap className="h-6 w-6 mx-auto mt-2 text-blue-600" />
              </CardContent>
            </Card>
            <Card className="border border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">2</div>
                <div className="text-sm text-gray-600">Graduated</div>
                <Award className="h-6 w-6 mx-auto mt-2 text-green-600" />
              </CardContent>
            </Card>
            <Card className="border border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">1</div>
                <div className="text-sm text-gray-600">Review Due</div>
                <Bell className="h-6 w-6 mx-auto mt-2 text-orange-600" />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {scholars.map((scholar) => (
              <Card key={scholar.id} className="border border-gray-200">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <CardTitle className="text-lg">{scholar.name}</CardTitle>
                      <CardDescription>{scholar.program} • Started {scholar.started}</CardDescription>
                    </div>
                    <Badge className={cn(
                      getPhaseColor(scholar.currentPhase),
                      "w-fit"
                    )}>
                      {scholar.currentPhase}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Research Topic</h4>
                    <p className="text-sm text-gray-700">{scholar.topic}</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Progress</h4>
                      <span className="text-sm text-gray-600">{scholar.progress}%</span>
                    </div>
                    <Progress value={scholar.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Coursework</span>
                      <span>Proposal</span>
                      <span>Mid Review</span>
                      <span>Final</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Next Review
                      </h4>
                      <p className="text-sm text-orange-600 font-medium">{scholar.nextReview}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Recent Meetings</h4>
                      <p className="text-sm text-gray-600">{scholar.meetings.length} logged</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Recent Meeting Log</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {scholar.meetings.map((meeting, index) => (
                        <div key={index} className="p-2 border border-gray-200 rounded text-sm">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium">{meeting.date}</span>
                          </div>
                          <p className="text-gray-700 mb-1">{meeting.summary}</p>
                          <p className="text-blue-600 text-xs">Target: {meeting.target}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline">
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule Meeting
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-1" />
                      Add Log Entry
                    </Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6 pt-6">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <Award className="h-5 w-5 text-yellow-600" />
                <span>Awards & Recognition</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Best Faculty Award", year: "2023", organization: "GBU" },
                  { title: "Excellence in Research", year: "2022", organization: "IEEE" },
                  { title: "Outstanding Teacher Award", year: "2021", organization: "GBU" }
                ].map((award, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg flex items-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <Award className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{award.title}</h3>
                      <p className="text-sm text-gray-600">{award.organization} • {award.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FacultyProfile;