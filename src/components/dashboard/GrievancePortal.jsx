import { useState } from "react";
import { AlertTriangle, Clock, CheckCircle, FileText, Camera, Wifi, Lightbulb, Car } from "lucide-react";

// --- Inline UI Components ---

// Card Component (Inline)
const CustomCard = ({ children, className = "" }) => (
  <div className={`rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm ${className}`}>
    {children}
  </div>
);

// CardHeader Component (Inline)
const CustomCardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

// CardTitle Component (Inline)
const CustomCardTitle = ({ children, className = "" }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

// CardDescription Component (Inline)
const CustomCardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-500 ${className}`}>
    {children}
  </p>
);

// CardContent Component (Inline)
const CustomCardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

// Button Component (Inline)
const CustomButton = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  type = "button"
}) => {
  let baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  let variantClasses = "";
  let sizeClasses = "";

  switch (variant) {
    case "default":
      variantClasses = "bg-blue-600 text-white hover:bg-blue-700";
      break;
    case "outline":
      variantClasses = "border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900";
      break;
    case "secondary":
      variantClasses = "bg-gray-100 text-gray-900 hover:bg-gray-200";
      break;
    case "ghost":
      variantClasses = "hover:bg-gray-100 hover:text-gray-900";
      break;
    case "link":
      variantClasses = "text-blue-600 underline-offset-4 hover:underline";
      break;
    case "destructive":
      variantClasses = "bg-red-600 text-white hover:bg-red-700";
      break;
    default:
      variantClasses = "bg-blue-600 text-white hover:bg-blue-700";
  }

  switch (size) {
    case "default":
      sizeClasses = "h-10 px-4 py-2";
      break;
    case "sm":
      sizeClasses = "h-9 rounded-md px-3";
      break;
    case "lg":
      sizeClasses = "h-11 rounded-md px-8";
      break;
    case "icon":
      sizeClasses = "h-10 w-10";
      break;
    default:
      sizeClasses = "h-10 px-4 py-2";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Badge Component (Inline)
const CustomBadge = ({ children, className = "", variant = "default" }) => {
  let variantClasses = "bg-gray-100 text-gray-800"; // Default
  if (variant === "secondary") {
    variantClasses = "bg-gray-500 text-white";
  }
  return (
    <span
      className={`inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};

// TabsList Component (Inline)
const CustomTabsList = ({ children, className = "" }) => (
  <div
    className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className}`}
  >
    {children}
  </div>
);

// TabsTrigger Component (Inline)
const CustomTabsTrigger = ({ value, children, className = "", activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(value)}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-24 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      activeTab === value ? "bg-white text-gray-900 shadow-sm" : ""
    } ${className}`}
  >
    {children}
  </button>
);

// TabsContent Component (Inline)
const CustomTabsContent = ({ value, children, className = "", activeTab }) => (
  <div
    className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
      activeTab === value ? "" : "hidden"
    } ${className}`}
  >
    {children}
  </div>
);

// --- Main GrievancePortal Component ---

const GrievancePortal = () => {
  const [grievances] = useState([
    {
      id: 1,
      title: "Broken Desk in Classroom",
      studentName: "John Doe",
      rollNo: "STU2023001",
      category: "Infrastructure",
      subcategory: "Furniture",
      description: "The desk in room 205B is broken and needs replacement. The right side is completely detached.",
      submittedDate: "2023-05-15",
      assignedTo: "Facility Team A",
      priority: "medium",
      status: "in-progress",
      images: true,
    },
    {
      id: 2,
      title: "WiFi Connectivity Issues",
      studentName: "Jane Smith",
      rollNo: "STU2023002",
      category: "Internet & IT",
      subcategory: "Network",
      description: "Consistent WiFi drops in the library area, particularly in the west wing.",
      submittedDate: "2023-05-18",
      assignedTo: "IT Support",
      priority: "high",
      status: "pending",
      images: false,
    },
    {
      id: 3,
      title: "Bus Schedule Irregularities",
      studentName: "Robert Johnson",
      rollNo: "STU2023003",
      category: "Transportation",
      subcategory: "Campus Shuttle",
      description: "The 5pm shuttle to downtown campus is frequently 15-20 minutes late.",
      submittedDate: "2023-05-20",
      assignedTo: "Transport Office",
      priority: "medium",
      status: "resolved",
      images: true,
    },
  ]);

  const [facilityIssues] = useState([
    {
      id: 1,
      issue: "Leaking Pipe in Restroom",
      location: "Main Building, 2nd Floor Men's Restroom",
      reportedBy: "Janitorial Staff",
      priority: "high",
      status: "in-progress",
    },
    {
      id: 2,
      issue: "Flickering Lights",
      location: "Science Wing, Corridor B",
      reportedBy: "Security Guard",
      priority: "medium",
      status: "pending",
    },
    {
      id: 3,
      issue: "Broken Window",
      location: "Library, Study Room 3",
      reportedBy: "Librarian",
      priority: "low",
      status: "resolved",
    },
  ]);

  const [activeTab, setActiveTab] = useState("student-grievances");

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "escalated":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Infrastructure":
        return <Lightbulb className="h-5 w-5" />;
      case "Internet & IT":
        return <Wifi className="h-5 w-5" />;
      case "Transportation":
        return <Car className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const handleStatusUpdate = (id, newStatus) => {
    console.log(`Updating grievance ${id} status to ${newStatus}`);
    // Here you would typically update the status in your state management
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-blue-900">Grievance Portal (FIRS)</h1>
      <p className="text-gray-600">
        Facility & Issue Reporting System - Track and resolve campus issues efficiently
      </p>

      <div className="space-y-6">
        <CustomTabsList className="grid w-full grid-cols-4">
          <CustomTabsTrigger value="student-grievances" activeTab={activeTab} setActiveTab={setActiveTab}>
            Student Grievances
          </CustomTabsTrigger>
          <CustomTabsTrigger value="facility-issues" activeTab={activeTab} setActiveTab={setActiveTab}>
            Facility Issues
          </CustomTabsTrigger>
          <CustomTabsTrigger value="create-ticket" activeTab={activeTab} setActiveTab={setActiveTab}>
            Create Ticket
          </CustomTabsTrigger>
          <CustomTabsTrigger value="analytics" activeTab={activeTab} setActiveTab={setActiveTab}>
            Analytics
          </CustomTabsTrigger>
        </CustomTabsList>

        <CustomTabsContent value="student-grievances" activeTab={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <CustomCard>
              <CustomCardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">8</div>
                <div className="text-sm text-gray-600">Pending Review</div>
                <Clock className="h-6 w-6 mx-auto mt-2 text-yellow-600" />
              </CustomCardContent>
            </CustomCard>
            <CustomCard>
              <CustomCardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">15</div>
                <div className="text-sm text-gray-600">In Progress</div>
                <AlertTriangle className="h-6 w-6 mx-auto mt-2 text-blue-600" />
              </CustomCardContent>
            </CustomCard>
            <CustomCard>
              <CustomCardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">47</div>
                <div className="text-sm text-gray-600">Resolved</div>
                <CheckCircle className="h-6 w-6 mx-auto mt-2 text-green-600" />
              </CustomCardContent>
            </CustomCard>
            <CustomCard>
              <CustomCardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">3</div>
                <div className="text-sm text-gray-600">Escalated</div>
                <AlertTriangle className="h-6 w-6 mx-auto mt-2 text-red-600" />
              </CustomCardContent>
            </CustomCard>
          </div>

          <div className="space-y-4">
            {grievances.map((grievance) => (
              <CustomCard key={grievance.id}>
                <CustomCardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      {getCategoryIcon(grievance.category)}
                      <div>
                        <CustomCardTitle className="text-lg">
                          {grievance.title}
                        </CustomCardTitle>
                        <CustomCardDescription>
                          {grievance.studentName} ({grievance.rollNo}) •{" "}
                          {grievance.category} - {grievance.subcategory}
                        </CustomCardDescription>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <CustomBadge className={getPriorityColor(grievance.priority)}>
                        {grievance.priority.toUpperCase()}
                      </CustomBadge>
                      <CustomBadge className={getStatusColor(grievance.status)}>
                        {grievance.status.toUpperCase()}
                      </CustomBadge>
                    </div>
                  </div>
                </CustomCardHeader>
                <CustomCardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Issue Description:</h4>
                      <p className="text-sm text-gray-700">{grievance.description}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Details:</h4>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="font-medium">Ticket ID:</span>{" "}
                          {grievance.id}
                        </p>
                        <p>
                          <span className="font-medium">Submitted:</span>{" "}
                          {grievance.submittedDate}
                        </p>
                        <p>
                          <span className="font-medium">Assigned to:</span>{" "}
                          {grievance.assignedTo}
                        </p>
                        {grievance.images && (
                          <div className="flex items-center text-blue-600">
                            <Camera className="h-4 w-4 mr-1" />
                            <span>Photos attached</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <CustomButton size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </CustomButton>
                      <CustomButton size="sm" variant="outline">
                        Contact Reporter
                      </CustomButton>
                    </div>
                    <div className="flex space-x-2">
                      {grievance.status === "pending" && (
                        <CustomButton
                          size="sm"
                          onClick={() => handleStatusUpdate(grievance.id, "in-progress")}
                        >
                          Assign & Start
                        </CustomButton>
                      )}
                      {grievance.status === "in-progress" && (
                        <CustomButton
                          size="sm"
                          onClick={() => handleStatusUpdate(grievance.id, "resolved")}
                        >
                          Mark Resolved
                        </CustomButton>
                      )}
                    </div>
                  </div>
                </CustomCardContent>
              </CustomCard>
            ))}
          </div>
        </CustomTabsContent>

        <CustomTabsContent value="facility-issues" activeTab={activeTab}>
          <div className="flex justify-between mb-10 items-center">
            <h2 className="text-xl  font-semibold">Facility Maintenance Issues</h2>
            <CustomButton>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report New Issue
            </CustomButton>
          </div>

          <div className="space-y-4">
            {facilityIssues.map((issue) => (
              <CustomCard key={issue.id}>
                <CustomCardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{issue.issue}</h3>
                      <p className="text-sm text-gray-600">{issue.location}</p>
                      <p className="text-xs text-gray-500">
                        Reported by {issue.reportedBy}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <CustomBadge className={getPriorityColor(issue.priority)}>
                        {issue.priority.toUpperCase()}
                      </CustomBadge>
                      <CustomBadge className={getStatusColor(issue.status)}>
                        {issue.status.toUpperCase()}
                      </CustomBadge>
                    </div>
                  </div>
                </CustomCardContent>
              </CustomCard>
            ))}
          </div>
        </CustomTabsContent>

        <CustomTabsContent value="create-ticket" activeTab={activeTab}>
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle>Create New Grievance/Issue Ticket</CustomCardTitle>
              <CustomCardDescription>
                Report facility issues or create tickets on behalf of students
              </CustomCardDescription>
            </CustomCardHeader>
            <CustomCardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Reporter Type
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Faculty (on behalf of student)</option>
                    <option>Facility Staff</option>
                    <option>Self Report</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Infrastructure</option>
                    <option>Internet & IT</option>
                    <option>Transportation</option>
                    <option>Cafeteria</option>
                    <option>Hostel</option>
                    <option>Library</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Priority Level
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Specific location of the issue"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Issue Title</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief title describing the issue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Detailed Description
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Provide detailed description of the issue..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Attach Photos/Documents
                </label>
                <CustomButton variant="outline" className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Upload Files
                </CustomButton>
              </div>
              <CustomButton className="w-full">Submit Ticket</CustomButton>
            </CustomCardContent>
          </CustomCard>
        </CustomTabsContent>

        <CustomTabsContent value="analytics" activeTab={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomCard>
              <CustomCardHeader>
                <CustomCardTitle>Issue Categories Breakdown</CustomCardTitle>
              </CustomCardHeader>
              <CustomCardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Infrastructure</span>
                    <span className="font-bold">32%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "32%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Internet & IT</span>
                    <span className="font-bold">28%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "28%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Transportation</span>
                    <span className="font-bold">18%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-600 h-2 rounded-full"
                      style={{ width: "18%" }}
                    ></div>
                  </div>
                </div>
              </CustomCardContent>
            </CustomCard>

            <CustomCard>
              <CustomCardHeader>
                <CustomCardTitle>Resolution Performance</CustomCardTitle>
              </CustomCardHeader>
              <CustomCardContent>
                <div className="space-y-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">2.3 days</div>
                    <div className="text-sm text-gray-600">Average Resolution Time</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">94%</div>
                    <div className="text-sm text-gray-600">Resolution Rate</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">4.6/5</div>
                    <div className="text-sm text-gray-600">Satisfaction Score</div>
                  </div>
                </div>
              </CustomCardContent>
            </CustomCard>
          </div>

          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle>Monthly Trends</CustomCardTitle>
            </CustomCardHeader>
            <CustomCardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold">73</div>
                  <div className="text-sm text-gray-600">This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">68</div>
                  <div className="text-sm text-gray-600">Last Month</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">+7%</div>
                  <div className="text-sm text-gray-600">Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">15</div>
                  <div className="text-sm text-gray-600">Active Cases</div>
                </div>
              </div>
            </CustomCardContent>
          </CustomCard>
        </CustomTabsContent>
      </div>
    </div>
  );
};

export default GrievancePortal;