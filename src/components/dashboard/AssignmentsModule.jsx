import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  Upload,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  MessageSquare, // For comments
  X // For closing modals
} from "lucide-react";

// Utility function to combine class names
function cn(...inputs) {
  return inputs
    .flat()
    .filter(Boolean)
    .join(' ')
    .trim();
}

// --- Reusable UI Components (Moved outside AssignmentsModule) ---

// CustomCard Component
const CustomCard = ({ children, className = "" }) => (
  <div className={cn("rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm", className)}>
    {children}
  </div>
);

// CustomCardHeader Component
const CustomCardHeader = ({ children, className = "" }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
    {children}
  </div>
);

// CustomCardTitle Component
const CustomCardTitle = ({ children, className = "" }) => (
  <h3 className={cn("text-xl font-semibold leading-none tracking-tight", className)}>
    {children}
  </h3>
);

// CustomCardDescription Component
const CustomCardDescription = ({ children, className = "" }) => (
  <p className={cn("text-sm text-gray-600", className)}>
    {children}
  </p>
);

// CustomCardContent Component
const CustomCardContent = ({ children, className = "" }) => (
  <div className={cn("p-6 pt-0", className)}>
    {children}
  </div>
);

// CustomButton Component
const CustomButton = ({ children, onClick, variant = "default", size = "default", className = "", type = "button" }) => {
  let baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:h-4 [&_svg]:w-4";
  let variantClasses = "";
  let sizeClasses = "";

  switch (variant) {
    case "default":
      variantClasses = "bg-blue-600 text-white hover:bg-blue-700";
      break;
    case "outline":
      variantClasses = "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900";
      break;
    case "secondary":
      variantClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300";
      break;
    case "ghost":
      variantClasses = "hover:bg-gray-100 text-gray-700";
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
      sizeClasses = "h-10 w-10 p-0";
      break;
    default:
      sizeClasses = "h-10 px-4 py-2";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(baseClasses, variantClasses, sizeClasses, className)}
    >
      {children}
    </button>
  );
};

// CustomInput Component
const CustomInput = ({ className = "", type = "text", ...props }) => {
  return (
    <input
      type={type}
      className={cn("flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    />
  );
};

// CustomTextarea Component
const CustomTextarea = ({ className = "", ...props }) => {
  return (
    <textarea
      className={cn("flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    />
  );
};

// CustomBadge Component
const CustomBadge = ({ children, className = "", variant = "default" }) => {
  let variantClasses = "";
  switch (variant) {
    case "default":
      variantClasses = "border-transparent bg-blue-600 text-white";
      break;
    case "secondary":
      variantClasses = "border-gray-200 bg-gray-200 text-gray-800";
      break;
    case "destructive":
      variantClasses = "border-transparent bg-red-600 text-white";
      break;
    case "outline":
      variantClasses = "text-gray-700 border border-gray-300";
      break;
    default:
      variantClasses = "border-transparent bg-blue-600 text-white";
  }
  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2", variantClasses, className)}>
      {children}
    </div>
  );
};
// Tabs Components
const CustomTabs = ({ defaultValue, children, className = "", activeTab, setActiveTab }) => {
  // We need to clone children to pass activeTab to CustomTabsContent
  return (
    <div className={cn("space-y-6", className)}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          if (child.type === CustomTabsList) {
            return React.cloneElement(child, { activeTab, setActiveTab });
          } else if (child.type === CustomTabsContent) {
            return React.cloneElement(child, { activeTab }); // Pass activeTab to content
          }
        }
        return child;
      })}
    </div>
  );
};

const CustomTabsList = ({ children, className = "", activeTab, setActiveTab }) => (
  <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-700", className)}>
    {React.Children.map(children, child => {
      if (React.isValidElement(child) && child.type === CustomTabsTrigger) {
        return React.cloneElement(child, {
          active: child.props.value === activeTab,
          onClick: () => setActiveTab(child.props.value)
        });
      }
      return child;
    })}
  </div>
);

const CustomTabsTrigger = ({ value, children, className = "", active, onClick }) => (
  <button
    className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-24 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      active ? "bg-white  shadow-sm" : " hover:bg-gray-50 ",
      className
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

const CustomTabsContent = ({ value, children, className = "", activeTab }) => {
  // Conditionally render children based on activeTab
  return value === activeTab ? (
    <div className={cn("pt-4 sm:pt-6 space-y-6", className)} data-value={value}>
      {children}
    </div>
  ) : null;
};

// Generic Alert Dialog Component
const AlertDialog = ({ isOpen, onClose, title, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <CustomCard className="w-full max-w-sm">
        <CustomCardHeader>
          <CustomCardTitle>{title}</CustomCardTitle>
          <CustomCardDescription>{message}</CustomCardDescription>
        </CustomCardHeader>
        <CustomCardContent className="flex justify-end gap-2">
          {onConfirm && (
            <CustomButton variant="outline" onClick={onClose}>
              Cancel
            </CustomButton>
          )}
          <CustomButton onClick={onConfirm || onClose}>
            OK
          </CustomButton>
        </CustomCardContent>
      </CustomCard>
    </div>
  );
};

// Grade Selection Modal Component
const GradeSelectionModal = ({ isOpen, onClose, onSubmitGrade, currentGrade, currentComment }) => {
  const [selectedGrade, setSelectedGrade] = useState(currentGrade || null);
  const [comment, setComment] = useState(currentComment || "");
  const grades = ["A", "B", "C", "D", "F"]; // Available grades

  // Use useEffect to reset state when modal opens or currentGrade/currentComment change
  useEffect(() => {
    if (isOpen) {
      setSelectedGrade(currentGrade || null);
      setComment(currentComment || "");
    }
  }, [isOpen, currentGrade, currentComment]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <CustomCard className="w-full max-w-md">
        <CustomCardHeader>
          <CustomCardTitle>Select Grade</CustomCardTitle>
          <CustomCardDescription>Choose a grade and add comments for the submission.</CustomCardDescription>
        </CustomCardHeader>
        <CustomCardContent>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {grades.map((grade) => (
              <button
                key={grade}
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all",
                  selectedGrade === grade
                    ? getGradeBadgeColor(grade) + " border-blue-600 ring-2 ring-blue-500 scale-110"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                )}
                onClick={() => setSelectedGrade(grade)}
              >
                {grade}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Comment (Optional)</label>
            <CustomTextarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comments here..."
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <CustomButton variant="outline" onClick={onClose}>
              Cancel
            </CustomButton>
            <CustomButton onClick={() => onSubmitGrade(selectedGrade, comment)}>
              Submit Grade
            </CustomButton>
          </div>
        </CustomCardContent>
      </CustomCard>
    </div>
  );
};

// Helper function to determine submission grade badge color (re-defined here for modularity)
const getGradeBadgeColor = (grade) => {
  if (!grade) return "bg-gray-100 text-gray-800"; // No grade yet
  const firstChar = grade.toUpperCase().charAt(0);
  if (firstChar === 'A') return "bg-green-100 text-green-800";
  if (firstChar === 'B') return "bg-blue-100 text-blue-800";
  if (firstChar === 'C') return "bg-yellow-100 text-yellow-800";
  if (firstChar === 'D') return "bg-orange-100 text-orange-800";
  if (firstChar === 'F') return "bg-red-100 text-red-800";
  return "bg-gray-100 text-gray-800";
};

// --- Main AssignmentsModule Component ---
const AssignmentsModule = () => {
  // State for managing assignment data
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Assignment 1: Data Structures Basics",
      course: "CS-201",
      due: "2024-07-01",
      status: "active", // Can be 'active', 'grading', 'completed'
      submissions: 10,
      totalStudents: 30,
    },
    {
      id: 2,
      title: "Assignment 2: Machine Learning Models",
      course: "CS-401",
      due: "2024-07-15",
      status: "active", // Changed to active initially
      submissions: 25,
      totalStudents: 30,
    },
    {
      id: 3,
      title: "Project Alpha: Advanced Algorithms",
      course: "CS-201",
      due: "2024-08-01",
      status: "active", // Changed to active initially
      submissions: 28,
      totalStudents: 30,
    },
  ]);

  // State for managing submission data
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      assignmentId: 1, // Link to Assignment 1
      studentName: "John Doe",
      rollNo: "CS201001",
      submittedAt: "2024-06-28",
      status: "submitted", // Can be 'submitted', 'graded', 'late'
      grade: null,
      comment: ""
    },
    {
      id: 2,
      assignmentId: 1, // Link to Assignment 1
      studentName: "Jane Smith",
      rollNo: "CS201002",
      submittedAt: "2024-06-29",
      status: "graded",
      grade: "A",
      comment: "Excellent work, clear understanding of concepts."
    },
    {
      id: 3,
      assignmentId: 1, // Link to Assignment 1
      studentName: "Peter Jones",
      rollNo: "CS201003",
      submittedAt: "2024-07-02",
      status: "late",
      grade: null,
      comment: ""
    },
    {
      id: 4,
      assignmentId: 1, // Link to Assignment 1
      studentName: "Alice Brown",
      rollNo: "CS201004",
      submittedAt: "2024-06-30",
      status: "submitted",
      grade: null,
      comment: ""
    },
    {
      id: 5,
      assignmentId: 2, // Link to Assignment 2
      studentName: "Bob Johnson",
      rollNo: "CS401001",
      submittedAt: "2024-07-10",
      status: "submitted",
      grade: null,
      comment: ""
    },
    {
      id: 6,
      assignmentId: 2, // Link to Assignment 2
      studentName: "Charlie Davis",
      rollNo: "CS401002",
      submittedAt: "2024-07-12",
      status: "late",
      grade: null,
      comment: "Submitted late, partial credit."
    },
  ]);

  // State to manage the currently active tab
  const [activeTab, setActiveTab] = useState("assignments");

  // State for Create Assignment form
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    course: "",
    description: "",
    dueDate: "",
    maxPoints: "",
    file: null,
  });

  // State for generic alert modal
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertModalContent, setAlertModalContent] = useState({ title: "", message: "", onConfirm: null });

  // State for grading modal
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [currentGradingSubmissionId, setCurrentGradingSubmissionId] = useState(null);
  const [currentGradingAssignmentId, setCurrentGradingAssignmentId] = useState(null);

  // State for hover comment dialog
  const [hoveredCommentId, setHoveredCommentId] = useState(null);

  // State for course filter in review submissions
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("all");

  // Get unique courses for filter dropdown
  const uniqueCourses = [...new Set(assignments.map(a => a.course))];


  // Helper function to determine badge color based on assignment status
  const getAssignmentStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800";
      case "grading":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper function to determine icon based on submission status
  const getSubmissionStatusIcon = (status) => {
    switch (status) {
      case "submitted":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "graded":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "late":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };


  // --- Form Submission Handlers ---

  const handleCreateAssignmentChange = (e) => {
    const { name, value, files } = e.target;
    setNewAssignment(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleCreateAssignmentSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!newAssignment.title || !newAssignment.course || !newAssignment.dueDate || !newAssignment.maxPoints) {
      setAlertModalContent({
        title: "Missing Information",
        message: "Please fill in all required fields for the new assignment."
      });
      setShowAlertModal(true);
      return;
    }

    const newId = assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1;
    const newAssignmentEntry = {
      id: newId,
      title: newAssignment.title,
      course: newAssignment.course,
      due: newAssignment.dueDate,
      status: "active", // New assignments are active
      submissions: 0, // No submissions initially
      totalStudents: 30, // Default for sample data
    };

    setAssignments(prev => [...prev, newAssignmentEntry]);
    setAlertModalContent({
      title: "Assignment Created",
      message: `Assignment "${newAssignment.title}" created successfully!`
    });
    setShowAlertModal(true);

    // Reset form
    setNewAssignment({
      title: "",
      course: "",
      description: "",
      dueDate: "",
      maxPoints: "",
      file: null,
    });
    setActiveTab("assignments"); // Navigate back to assignments list
  };

  const handleGradeSubmission = (submissionId, assignmentId) => {
    setCurrentGradingSubmissionId(submissionId);
    setCurrentGradingAssignmentId(assignmentId);
    setShowGradeModal(true);
  };

  const confirmGrade = (grade, comment) => {
    if (!grade) {
      setAlertModalContent({
        title: "Invalid Grade",
        message: "Please select a grade."
      });
      setShowAlertModal(true);
      return;
    }

    const submissionId = currentGradingSubmissionId;
    const assignmentId = currentGradingAssignmentId;
    const formattedGrade = grade.toUpperCase();

    setSubmissions(prevSubmissions => {
      const updatedSubs = prevSubmissions.map(sub =>
        sub.id === submissionId
          ? { ...sub, status: "graded", grade: formattedGrade, comment: comment }
          : sub
      );

      // Check if all submissions for this assignment are now graded
      const relatedSubmissions = updatedSubs.filter(s => s.assignmentId === assignmentId);
      const allGraded = relatedSubmissions.every(s => s.status === "graded");

      setAssignments(prevAssignments =>
        prevAssignments.map(assign =>
          assign.id === assignmentId
            ? { ...assign, status: allGraded ? "completed" : "grading" } // Set to 'grading' if not all graded
            : assign
        )
      );
      return updatedSubs;
    });

    setAlertModalContent({
      title: "Grade Updated",
      message: `Submission ${submissionId} graded as ${formattedGrade}.`
    });
    setShowAlertModal(true);
    setShowGradeModal(false); // Close grading modal
    setCurrentGradingSubmissionId(null);
    setCurrentGradingAssignmentId(null);
  };

  // Filter submissions based on selected course
  const filteredSubmissions = submissions.filter(submission => {
    if (selectedCourseFilter === "all") {
      return true;
    }
    const assignment = assignments.find(a => a.id === submission.assignmentId);
    return assignment && assignment.course === selectedCourseFilter;
  });


  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">Assignment Management</h1>
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
          <Clock className="h-5 w-5 text-blue-600" />
          <span className="text-sm sm:text-base text-gray-600">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>

      <CustomTabs defaultValue="assignments" activeTab={activeTab} setActiveTab={setActiveTab}>
        <CustomTabsList className="grid w-full grid-cols-3 sm:grid-cols-3 gap-2">
          <CustomTabsTrigger value="assignments">
            <FileText className="h-4 w-4 mr-2" />
            <span>Assignments</span>
          </CustomTabsTrigger>
          <CustomTabsTrigger value="create-assignment">
            <Upload className="h-4 w-4 mr-2" />
            <span>Create Assignment</span>
          </CustomTabsTrigger>
          <CustomTabsTrigger value="review-submissions">
            <Eye className="h-4 w-4 mr-2" />
            <span>Review Submissions</span>
          </CustomTabsTrigger>
        </CustomTabsList>

        {/* Assignments Tab */}
        <CustomTabsContent value="assignments">
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle>All Assignments</CustomCardTitle>
              <CustomCardDescription>Overview of all active, grading, and completed assignments.</CustomCardDescription>
            </CustomCardHeader>
            <CustomCardContent>
              <div className="space-y-4">
                {assignments.length > 0 ? (
                  assignments.map((assignment) => (
                    <div key={assignment.id} className="p-4 border border-gray-100 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-900">{assignment.title}</h4>
                        <p className="text-sm text-gray-600">Course: {assignment.course}</p>
                        <p className="text-sm text-gray-600">Due: {new Date(assignment.due).toLocaleDateString()}</p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <CustomBadge className={getAssignmentStatusColor(assignment.status)}>
                          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                        </CustomBadge>
                        <p className="text-sm text-gray-700">
                          {assignment.submissions} / {assignment.totalStudents} Submissions
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No assignments created yet.</p>
                )}
              </div>
            </CustomCardContent>
          </CustomCard>
        </CustomTabsContent>

        {/* Create Assignment Tab */}
        <CustomTabsContent value="create-assignment">
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle>Create New Assignment</CustomCardTitle>
              <CustomCardDescription>Fill in the details to create a new assignment.</CustomCardDescription>
            </CustomCardHeader>
            <CustomCardContent>
              <form onSubmit={handleCreateAssignmentSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Assignment Title</label>
                  <CustomInput
                    id="title"
                    name="title"
                    value={newAssignment.title}
                    onChange={handleCreateAssignmentChange}
                    placeholder="e.g., Data Structures Midterm Project"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <CustomInput
                    id="course"
                    name="course"
                    value={newAssignment.course}
                    onChange={handleCreateAssignmentChange}
                    placeholder="e.g., CS-201"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                  <CustomTextarea
                    id="description"
                    name="description"
                    value={newAssignment.description}
                    onChange={handleCreateAssignmentChange}
                    placeholder="Detailed description of the assignment."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <CustomInput
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      value={newAssignment.dueDate}
                      onChange={handleCreateAssignmentChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="maxPoints" className="block text-sm font-medium text-gray-700 mb-1">Max Points</label>
                    <CustomInput
                      id="maxPoints"
                      name="maxPoints"
                      type="number"
                      value={newAssignment.maxPoints}
                      onChange={handleCreateAssignmentChange}
                      placeholder="e.g., 100"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">Upload Assignment File (Optional)</label>
                  <CustomInput
                    id="file"
                    name="file"
                    type="file"
                    onChange={handleCreateAssignmentChange}
                    className="file:text-blue-600 file:bg-gray-100 file:border-0 file:rounded-md file:py-1 file:px-2"
                  />
                  {newAssignment.file && (
                    <p className="text-sm text-gray-500 mt-1">Selected file: {newAssignment.file.name}</p>
                  )}
                </div>
                <CustomButton type="submit" className="w-full">
                  <Upload className="h-4 w-4" />
                  Create Assignment
                </CustomButton>
              </form>
            </CustomCardContent>
          </CustomCard>
        </CustomTabsContent>

        {/* Review Submissions Tab */}
        <CustomTabsContent value="review-submissions">
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle>Review Submissions</CustomCardTitle>
              <CustomCardDescription>Grade submitted assignments and manage late submissions.</CustomCardDescription>
            </CustomCardHeader>
            <CustomCardContent>
              <div className="mb-4 flex items-center gap-2">
                <label htmlFor="courseFilter" className="block text-sm font-medium text-gray-700">Filter by Course:</label>
                <select
                  id="courseFilter"
                  className="block w-48 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedCourseFilter}
                  onChange={(e) => setSelectedCourseFilter(e.target.value)}
                >
                  <option value="all">All Courses</option>
                  {uniqueCourses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((submission) => {
                    const assignment = assignments.find(a => a.id === submission.assignmentId);
                    return (
                      <div key={submission.id} className="p-4 border border-gray-100 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-gray-900">{submission.studentName} ({submission.rollNo})</h4>
                          <p className="text-sm text-gray-600">
                            Assignment: {assignment ? assignment.title : 'N/A'}
                          </p>
                          <p className="text-sm text-gray-600">Submitted: {new Date(submission.submittedAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <div className="flex items-center gap-2">
                            {getSubmissionStatusIcon(submission.status)}
                            {/* Removed assignment status badge as per request */}

                            {/* Display grade as a circle */}
                            {submission.grade && (
                              <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                                getGradeBadgeColor(submission.grade)
                              )}>
                                {submission.grade}
                              </div>
                            )}

                            {/* View Comment Button with hover functionality */}
                            {submission.comment && (
                              <div
                                className="relative"
                                onMouseEnter={() => setHoveredCommentId(submission.id)}
                                onMouseLeave={() => setHoveredCommentId(null)}
                              >
                                <CustomButton
                                  variant="ghost"
                                  size="icon"
                                  className="ml-2"
                                >
                                  <MessageSquare className="h-5 w-5 text-gray-600" />
                                </CustomButton>
                                {hoveredCommentId === submission.id && (
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48 text-sm text-gray-800">
                                    {submission.comment}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 mt-2">
                            {submission.status !== "graded" && (
                              <CustomButton
                                variant="default"
                                size="sm"
                                onClick={() => handleGradeSubmission(submission.id, submission.assignmentId)}
                              >
                                <CheckCircle className="h-4 w-4" />
                                Grade
                              </CustomButton>
                            )}
                            {submission.status === "graded" && (
                              <CustomButton
                                variant="outline"
                                size="sm"
                                onClick={() => handleGradeSubmission(submission.id, submission.assignmentId)}
                              >
                                <FileText className="h-4 w-4" />
                                Re-grade
                              </CustomButton>
                            )}
                            <CustomButton variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                              Download
                            </CustomButton>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-gray-500">No submissions to review for the selected course.</p>
                )}
              </div>
            </CustomCardContent>
          </CustomCard>
        </CustomTabsContent>
      </CustomTabs>

      {/* Generic Alert Modal */}
      <AlertDialog
        isOpen={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        title={alertModalContent.title}
        message={alertModalContent.message}
        onConfirm={alertModalContent.onConfirm}
      />

      {/* Grade Selection Modal */}
      <GradeSelectionModal
        isOpen={showGradeModal}
        onClose={() => setShowGradeModal(false)}
        onSubmitGrade={confirmGrade}
        currentGrade={
          currentGradingSubmissionId
            ? submissions.find(sub => sub.id === currentGradingSubmissionId)?.grade
            : null
        }
        currentComment={
          currentGradingSubmissionId
            ? submissions.find(sub => sub.id === currentGradingSubmissionId)?.comment
            : ""
        }
      />
    </div>
  );
};

export default AssignmentsModule;
