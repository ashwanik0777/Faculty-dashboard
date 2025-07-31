import { useState } from "react";

// Removed all icon imports as they are no longer used
// import { MessageSquareText, TrendingUp as TrendingUpIcon, BarChart4, Pencil } from "lucide-react";
import { Star, TrendingUp, MessageSquare, Award, BarChart4 } from "lucide-react";


function cn(...inputs) {
  return inputs
    .flat()
    .filter(Boolean)
    .join(' ')
    .trim();
}

const FeedbackModule = () => {
  const [feedbackData] = useState([
    {
      id: 1,
      studentName: "Rahul Sharma",
      rollNo: "2021001",
      course: "CS-201 - Data Structures",
      rating: 5,
      date: "2024-05-15",
      feedback:
        "Excellent understanding of complex concepts and active participation in class discussions.",
    },
    {
      id: 2,
      studentName: "Priya Singh",
      rollNo: "2021002",
      course: "CS-401 - Machine Learning",
      rating: 4,
      date: "2024-05-10",
      feedback: "Shows great potential but needs to work on assignment deadlines.",
    },
    {
      id: 3,
      studentName: "Amit Kumar",
      rollNo: "2021003",
      course: "CS-201 - Data Structures",
      rating: 3,
      date: "2024-05-05",
      feedback: "Average performance, needs to participate more in practical sessions.",
    },
  ]);

  const [performanceData] = useState([
    {
      student: "Rahul Sharma",
      rollNo: "2021001",
      attendance: 95,
      assignments: 90,
      participation: 88,
      overall: "A+",
    },
    {
      student: "Priya Singh",
      rollNo: "2021002",
      attendance: 85,
      assignments: 92,
      participation: 78,
      overall: "A",
    },
    {
      student: "Amit Kumar",
      rollNo: "2021003",
      attendance: 75,
      assignments: 80,
      participation: 65,
      overall: "B",
    },
  ]);

  const [activeTab, setActiveTab] = useState("feedback-received");

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+":
        return "bg-green-100 text-green-800";
      case "A":
        return "bg-blue-100 text-blue-800";
      case "B":
        return "bg-yellow-100 text-yellow-800";
      case "C":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

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
  const CustomButton = ({ children, onClick, variant = "default", size = "default", className = "" }) => {
    let baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
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
        onClick={onClick}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      >
        {children}
      </button>
    );
  };

  // Badge Component (Inline)
  const CustomBadge = ({ children, className = "" }) => (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  );

const CustomTabsList = ({ children, className = "" }) => (
  <div
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-700 gap-2", // Reverted gap-30 to gap-2
      className
    )}
  >
    {children}
  </div>
);

// CustomTabsTrigger Component - Icons removed, px changes reverted
const CustomTabsTrigger = ({ value, children, className = "", setActiveTab, activeTab }) => ( // Removed Icon prop
  <button
    onClick={() => setActiveTab(value)}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md py-1.5 text-sm font-semibold transition-all",
      // Reverted px changes to original:
      activeTab === value
        ? "bg-white px-15 text-gray-900 shadow-sm" // Original px-15 for active
        : "text-gray-700 px-24 hover:bg-gray-100 hover:text-gray-700", // Original px-30 for inactive
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
  >
    {/* Removed Icon rendering: {Icon && <Icon className="h-4 w-4" />} */}
    {children}
  </button>
);

  // CustomTabsContent Component (Inline) - UPDATED STYLING
  const CustomTabsContent = ({ value, children, className = "", activeTab }) => (
    <div
      className={cn(
        "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2",
        activeTab === value ? "" : "hidden",
        className
      )}
    >
      {children}
    </div>
  );

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-blue-900">Student Performance Feedback</h1>

      <div className="space-y-6">
        {/* Pass activeTab and setActiveTab to CustomTabsTrigger components */}
        <CustomTabsList className="grid w-full grid-cols-4">
          <CustomTabsTrigger
            value="feedback-received"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            // Removed Icon prop: Icon={MessageSquareText}
          >
            Feedback Received
          </CustomTabsTrigger>
          <CustomTabsTrigger
            value="performance-tracking"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            // Removed Icon prop: Icon={TrendingUpIcon}
          >
            Performance Tracking
          </CustomTabsTrigger>
          <CustomTabsTrigger
            value="analytics"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            // Removed Icon prop: Icon={BarChart4}
          >
            Analytics
          </CustomTabsTrigger>
          <CustomTabsTrigger
            value="give-feedback"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            // Removed Icon prop: Icon={Pencil}
          >
            Give Feedback
          </CustomTabsTrigger>
        </CustomTabsList>

        {/* Pass activeTab to CustomTabsContent components */}
        <CustomTabsContent value="feedback-received" activeTab={activeTab} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <CustomCard>
              <CustomCardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">4.7</div>
                <div className="text-sm text-gray-600">Average Rating</div>
                <div className="flex justify-center mt-2">
                  {renderStars(5)}
                </div>
              </CustomCardContent>
            </CustomCard>
            <CustomCard>
              <CustomCardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-sm text-gray-600">Positive Feedback</div>
                <TrendingUp className="h-6 w-6 mx-auto mt-2 text-green-600" />
              </CustomCardContent>
            </CustomCard>
            <CustomCard>
              <CustomCardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">124</div>
                <div className="text-sm text-gray-600">Total Reviews</div>
                <MessageSquare className="h-6 w-6 mx-auto mt-2 text-purple-600" />
              </CustomCardContent>
            </CustomCard>
          </div>

          <div className="space-y-4">
            {feedbackData.map((feedback) => (
              <CustomCard key={feedback.id}>
                <CustomCardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium">{feedback.studentName}</p>
                      <p className="text-sm text-gray-600">
                        {feedback.rollNo} • {feedback.course}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">{renderStars(feedback.rating)}</div>
                      <span className="text-sm text-gray-600">
                        {feedback.date}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{feedback.feedback}"</p>
                </CustomCardContent>
              </CustomCard>
            ))}
          </div>
        </CustomTabsContent>

        <CustomTabsContent value="performance-tracking" activeTab={activeTab} className="space-y-6">
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle>Student Performance Overview</CustomCardTitle>
              <CustomCardDescription>
                Track individual student progress and performance metrics
              </CustomCardDescription>
            </CustomCardHeader>
            <CustomCardContent>
              <div className="space-y-4">
                {performanceData.map((student, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="font-medium">{student.student}</p>
                        <p className="text-sm text-gray-600">
                          {student.rollNo}
                        </p>
                      </div>
                      <CustomBadge className={getGradeColor(student.overall)}>
                        Overall: {student.overall}
                      </CustomBadge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div
                          className={`text-lg font-bold ${getPerformanceColor(
                            student.attendance
                          )}`}
                        >
                          {student.attendance}%
                        </div>
                        <div className="text-sm text-gray-600">Attendance</div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-lg font-bold ${getPerformanceColor(
                            student.assignments
                          )}`}
                        >
                          {student.assignments}%
                        </div>
                        <div className="text-sm text-gray-600">Assignments</div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-lg font-bold ${getPerformanceColor(
                            student.participation
                          )}`}
                        >
                          {student.participation}%
                        </div>
                        <div className="text-sm text-gray-600">
                          Participation
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CustomCardContent>
          </CustomCard>
        </CustomTabsContent>

        <CustomTabsContent value="analytics" activeTab={activeTab} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomCard>
              <CustomCardHeader>
                <CustomCardTitle className="flex items-center">
                  <BarChart4 className="h-5 w-5 mr-2" />
                  Course Performance Trends
                </CustomCardTitle>
              </CustomCardHeader>
              <CustomCardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>CS-201 (Data Structures)</span>
                    <span className="font-bold text-green-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>CS-401 (Machine Learning)</span>
                    <span className="font-bold text-blue-600">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
              </CustomCardContent>
            </CustomCard>

            <CustomCard>
              <CustomCardHeader>
                <CustomCardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Teaching Excellence Metrics
                </CustomCardTitle>
              </CustomCardHeader>
              <CustomCardContent>
                <div className="space-y-4">
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-xl font-bold text-yellow-600">
                      4.8/5.0
                    </div>
                    <div className="text-sm text-gray-600">
                      Student Satisfaction
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">96%</div>
                    <div className="text-sm text-gray-600">
                      Course Completion Rate
                    </div>
                  </div>
                </div>
              </CustomCardContent>
            </CustomCard>
          </div>
        </CustomTabsContent>

        <CustomTabsContent value="give-feedback" activeTab={activeTab} className="space-y-6">
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle>Provide Student Feedback</CustomCardTitle>
              <CustomCardDescription>
                Give personalized feedback to students
              </CustomCardDescription>
            </CustomCardHeader>
            <CustomCardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Student
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                    <option>Rahul Sharma - 2021001</option>
                    <option>Priya Singh - 2021002</option>
                    <option>Amit Kumar - 2021003</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Course</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                    <option>CS-201 - Data Structures</option>
                    <option>CS-401 - Machine Learning</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Feedback Category
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Academic Performance</option>
                  <option>Class Participation</option>
                  <option>Assignment Quality</option>
                  <option>Overall Progress</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Detailed Feedback
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md h-32 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Provide constructive feedback..."
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Performance Rating
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                    <option>Excellent (A+)</option>
                    <option>Very Good (A)</option>
                    <option>Good (B)</option>
                    <option>Average (C)</option>
                    <option>Needs Improvement (D)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Recommendations
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Suggestions for improvement"
                  />
                </div>
              </div>
              <CustomButton className="w-full">Submit Feedback</CustomButton>
            </CustomCardContent>
          </CustomCard>
        </CustomTabsContent>
      </div>
    </div>
  );
};

export default FeedbackModule;