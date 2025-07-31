import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  FileText,
  Filter,
  Eye,
  MessageSquare,
  Menu,
  X // For closing modals
} from "lucide-react";

// --- UI Components moved outside AttendanceModule to prevent re-definition ---

const Button = React.memo(React.forwardRef(({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
  const variants = {
    default: "bg-blue-600 border border-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 border border-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    ghost: "hover:bg-gray-100 text-gray-700",
    link: "text-blue-600 underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4";

  const Comp = asChild ? "span" : "button";

  return (
    <Comp
      ref={ref}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}));
Button.displayName = "Button";

const Badge = React.memo(({ className, variant = "default", children, ...props }) => {
  const variants = {
    default: "border-transparent bg-blue-700 text-white",
    secondary: "border-gray-200 bg-gray-200 text-gray-800",
    destructive: "border-transparent bg-red-600 text-white",
    outline: "text-gray-700 border border-gray-300",
  };

  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2";

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
});
Badge.displayName = "Badge";

const Input = React.memo(React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
      {...props}
    />
  );
}));
Input.displayName = "Input";

const Textarea = React.memo(React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}));
Textarea.displayName = "Textarea";

const Select = React.memo(({ children, value, onValueChange, placeholder = "Select...", ...props }) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);
  const buttonRef = useRef(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updateButtonWidth = () => {
      if (buttonRef.current) {
        setButtonWidth(buttonRef.current.offsetWidth);
      }
    };
    updateButtonWidth();
    window.addEventListener('resize', updateButtonWidth);
    return () => {
      window.removeEventListener('resize', updateButtonWidth);
    };
  }, [open]);

  const handleValueChangeInternal = (newValue) => {
    if (onValueChange) onValueChange(newValue);
    setOpen(false);
  };

  const selectedChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.props.value === value);
  const displayedText = selectedChild ? selectedChild.props.children : placeholder;

  return (
    <div className="relative" ref={selectRef} {...props}>
      <button
        ref={buttonRef}
        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{displayedText}</span>
        <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${open ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      {open && (
        <div
          className="absolute z-50 mt-1 overflow-hidden rounded-md border bg-white shadow-lg animate-in fade-in-80"
          style={{ width: buttonWidth > 0 ? `${buttonWidth}px` : 'auto' }}
        >
          <div className="p-1 max-h-60 overflow-y-auto custom-scrollbar-hide custom-scrollbar-show-on-hover">
            {React.Children.map(children, child => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  onClick: () => handleValueChangeInternal(child.props.value),
                  selected: child.props.value === value,
                  className: `relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50
                  ${child.props.value === value ? 'bg-blue-50 text-blue-700 font-medium' : ''}
                  `
                });
              }
              return child;
            })}
          </div>
        </div>
      )}
    </div>
  );
});
Select.displayName = "Select";

const SelectItem = React.memo(({ children, value, onClick, className, selected, ...props }) => {
  return (
    <div
      className={className}
      onClick={onClick}
      role="option"
      aria-selected={selected}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {selected && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  );
});
SelectItem.displayName = "SelectItem";

const Table = React.memo(({ className, children, ...props }) => (
  <div className="relative w-full overflow-auto">
    <table className={`w-full caption-bottom text-sm ${className}`} {...props}>
      {children}
    </table>
  </div>
));
Table.displayName = "Table";

const TableHeader = React.memo(({ className, children, ...props }) => (
  <thead className={`[&_tr]:border-b ${className}`} {...props}>
    {children}
  </thead>
));
TableHeader.displayName = "TableHeader";

const TableBody = React.memo(({ className, children, ...props }) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props}>
    {children}
  </tbody>
));
TableBody.displayName = "TableBody";

const TableRow = React.memo(({ className, children, ...props }) => (
  <tr
    className={`border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-gray-100 ${className}`}
    {...props}
  >
    {children}
  </tr>
));
TableRow.displayName = "TableRow";

const TableHead = React.memo(({ className, children, ...props }) => (
  <th
    className={`h-12 px-4 text-left align-middle border-b border-gray-200 font-medium text-gray-600 [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  >
    {children}
  </th>
));
TableHead.displayName = "TableHead";

const TableCell = React.memo(({ className, children, ...props }) => (
  <td
    className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  >
    {children}
  </td>
));
TableCell.displayName = "TableCell";

const Card = React.memo(({ className, children, ...props }) => (
  <div className={`rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm ${className}`} {...props}>
    {children}
  </div>
));
Card.displayName = "Card";

const CardHeader = React.memo(({ className, children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.memo(({ className, children, ...props }) => (
  <h3 className={`text-xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.memo(({ className, children, ...props }) => (
  <p className={`text-sm text-gray-600 ${className}`} {...props}>
    {children}
  </p>
));
CardDescription.displayName = "CardDescription";

const CardContent = React.memo(({ className, children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
));
CardContent.displayName = "CardContent";

// Custom Alert Modal Component
const AlertDialog = React.memo(({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end">
          <Button onClick={onClose}>OK</Button>
        </CardContent>
      </Card>
    </div>
  );
});
AlertDialog.displayName = "AlertDialog";

// Leave Action Modal Component (for Approve/Reject with comments)
const LeaveActionModal = React.memo(({ isOpen, onClose, leaveRequest, actionType, onConfirm }) => {
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setComment(""); // Reset comment when modal closes
    }
  }, [isOpen]);

  if (!isOpen || !leaveRequest) return null;

  const actionText = actionType === "approved" ? "Approve" : "Reject";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{actionText} Leave Request</CardTitle>
          <CardDescription>
            Confirm your action for {leaveRequest.studentName}'s leave request.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm font-medium">Student: {leaveRequest.studentName} ({leaveRequest.studentId})</p>
          <p className="text-sm">Reason: {leaveRequest.reason}</p>
          <p className="text-sm">Dates: {new Date(leaveRequest.fromDate).toLocaleDateString()} - {new Date(leaveRequest.toDate).toLocaleDateString()}</p>
          <div>
            <label htmlFor="actionComment" className="block text-sm font-medium mb-2">
              Add Comment (Optional)
            </label>
            <Textarea
              id="actionComment"
              placeholder={`Enter comments for ${actionText.toLowerCase()}ing this request...`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={() => onConfirm(leaveRequest.id, actionType, comment)}>
              Confirm {actionText}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});
LeaveActionModal.displayName = "LeaveActionModal";

// Leave Details Read-Only Modal
const LeaveDetailsModal = React.memo(({ isOpen, onClose, leaveRequest }) => {
  if (!isOpen || !leaveRequest) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Leave Request Details</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Student Name:</p>
            <p className="text-base">{leaveRequest.studentName} ({leaveRequest.studentId})</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Course & Semester:</p>
            <p className="text-base">{leaveRequest.course}, {leaveRequest.semester}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Leave Type:</p>
            <p className="text-base">{leaveRequest.leaveType}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Reason:</p>
            <p className="text-base">{leaveRequest.reason}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">From Date:</p>
            <p className="text-base">{new Date(leaveRequest.fromDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">To Date:</p>
            <p className="text-base">{new Date(leaveRequest.toDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Applied Date:</p>
            <p className="text-base">{new Date(leaveRequest.appliedDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Status:</p>
            <Badge className={getLeaveStatusColor(leaveRequest.status)}>
              {leaveRequest.status}
            </Badge>
          </div>
          {leaveRequest.comments && (
            <div>
              <p className="text-sm font-medium text-gray-700">Comments:</p>
              <p className="text-base">{leaveRequest.comments}</p>
            </div>
          )}
          {leaveRequest.attachment && (
            <div className="flex items-center text-blue-600">
              <FileText className="h-5 w-5 mr-2" />
              <a href="#" className="underline" onClick={(e) => { e.preventDefault(); console.log("Simulating attachment download."); }}>View Attachment</a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
});
LeaveDetailsModal.displayName = "LeaveDetailsModal";

// Tabs components - MOVED OUTSIDE AttendanceModule
const Tabs = ({ defaultValue, children, className, ...props }) => {
    // This is a wrapper component that doesn't directly manage activeTab state,
    // but expects its children (TabsContent and TabsList) to handle it.
    // The activeTab state is now managed within AttendanceModule.
    return (
        <div className={`space-y-6 ${className}`} {...props}>
            {children}
        </div>
    );
};
Tabs.displayName = "Tabs";

const TabsContent = ({ value, children, activeTab, ...props }) => { // Added activeTab prop
    return value === activeTab ? (
        <div className="pt-4 sm:pt-6 space-y-6" {...props}>
            {children}
        </div>
    ) : null;
};
TabsContent.displayName = "TabsContent";

const TabsList = React.memo(({ className, children, activeTab, setActiveTab, ...props }) => ( // Added activeTab, setActiveTab props
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-700 ${className}`} {...props}>
    {React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          active: child.props.value === activeTab,
          onClick: () => setActiveTab(child.props.value)
        });
      }
      return child;
    })}
  </div>
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.memo(({ value, className, children, active, onClick, ...props }) => ( // Added active prop
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:shadow-sm focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      active ? "bg-white shadow-sm" : " hover:bg-gray-50"
    } ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
));
TabsTrigger.displayName = "TabsTrigger";


const AttendanceModule = () => {
  const [selectedCourse, setSelectedCourse] = useState("CS-201");
  const [topicDiscussed, setTopicDiscussed] = useState("");
  const [remarks, setRemarks] = useState("");
  const [leaveFilter, setLeaveFilter] = useState({ course: "all", semester: "all", status: "all" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("mark-attendance");

  // State for Class Summary form
  const [classSummaryCourse, setClassSummaryCourse] = useState(null);
  const [classSummaryDate, setClassSummaryDate] = useState(new Date().toISOString().split('T')[0]);
  const [topicCovered, setTopicCovered] = useState("");
  const [duration, setDuration] = useState("");
  const [detailedNotes, setDetailedNotes] = useState("");
  const [homework, setHomework] = useState("");
  const [nextClassPrep, setNextClassPrep] = useState("");

  // State for custom alert modal
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertModalContent, setAlertModalContent] = useState({ title: "", message: "" });

  // State for leave action modal (Approve/Reject)
  const [showLeaveActionModal, setShowLeaveActionModal] = useState(false);
  const [currentLeaveAction, setCurrentLeaveAction] = useState({ leaveId: null, action: "", comment: "" });

  // State for leave details view modal
  const [showLeaveDetailsModal, setShowLeaveDetailsModal] = useState(false);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState(null);

  // Sample data
  const courses = [
    { code: "CS-201", name: "Data Structures", time: "10 AM", students: 30 },
    { code: "CS-401", name: "Machine Learning", time: "2 PM", students: 25 }
  ];

  const [studentLeaveRequests, setStudentLeaveRequests] = useState([
    {
      id: 1,
      studentName: "Amit Sharma",
      studentId: "S1001",
      course: "CS-201",
      semester: "3rd",
      leaveType: "Medical",
      reason: "Fever and doctor appointment",
      fromDate: "2023-05-15",
      toDate: "2023-05-16",
      appliedDate: "2023-05-14",
      status: "pending",
      leaveBalance: { medical: 5, casual: 3 },
      attachment: true
    },
    {
      id: 2,
      studentName: "Priya Singh",
      studentId: "S1002",
      course: "CS-401",
      semester: "5th",
      leaveType: "Casual",
      reason: "Family event",
      fromDate: "2023-06-01",
      toDate: "2023-06-01",
      appliedDate: "2023-05-28",
      status: "approved",
      leaveBalance: { medical: 4, casual: 2 },
      attachment: false
    },
    {
      id: 3,
      studentName: "Rahul Kumar",
      studentId: "S1003",
      course: "CS-201",
      semester: "3rd",
      leaveType: "Personal",
      reason: "Urgent personal matter",
      fromDate: "2023-07-10",
      toDate: "2023-07-12",
      appliedDate: "2023-07-08",
      status: "rejected",
      leaveBalance: { medical: 5, casual: 1 },
      attachment: true
    },
    {
      id: 4,
      studentName: "Sneha Reddy",
      studentId: "S1004",
      course: "CS-401",
      semester: "5th",
      leaveType: "Medical",
      reason: "Dental appointment",
      fromDate: "2023-08-20",
      toDate: "2023-08-20",
      appliedDate: "2023-08-18",
      status: "pending",
      leaveBalance: { medical: 4, casual: 3 },
      attachment: true
    },
    {
      id: 5,
      studentName: "Vikram Gupta",
      studentId: "S1005",
      course: "CS-201",
      semester: "3rd",
      leaveType: "Casual",
      reason: "Attending a workshop",
      fromDate: "2023-09-05",
      toDate: "2023-09-06",
      appliedDate: "2023-09-01",
      status: "pending",
      leaveBalance: { medical: 5, casual: 2 },
      attachment: false
    },
  ]);

  const [attendanceData, setAttendanceData] = useState({
    "CS-201": Array(30).fill().map((_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      rollNo: `S${1000 + i}`,
      disciplineCode: i % 3 === 0 ? "flagged" : i % 2 === 0 ? "cautioned" : "normal",
      lastClassStatus: ["present", "absent", "late"][i % 3],
      cgpa: (3.5 + Math.random()).toFixed(1),
      attendancePercent: Math.floor(70 + Math.random() * 30),
      status: "present" // Default status for marking attendance
    })),
    "CS-401": Array(25).fill().map((_, i) => ({
      id: i + 1,
      name: `Student ${i + 31}`,
      rollNo: `S${1030 + i}`,
      disciplineCode: i % 3 === 0 ? "flagged" : i % 2 === 0 ? "cautioned" : "normal",
      lastClassStatus: ["present", "absent", "late"][i % 3],
      cgpa: (3.5 + Math.random()).toFixed(1),
      attendancePercent: Math.floor(70 + Math.random() * 30),
      status: "present" // Default status for marking attendance
    }))
  });

  // Memoize state update handlers to prevent re-renders of memoized child components
  const handleTopicDiscussedChange = useCallback((e) => setTopicDiscussed(e.target.value), []);
  const handleRemarksChange = useCallback((e) => setRemarks(e.target.value), []);
  const handleClassSummaryCourseChange = useCallback((value) => setClassSummaryCourse(value), []);
  const handleClassSummaryDateChange = useCallback((e) => setClassSummaryDate(e.target.value), []);
  const handleTopicCoveredChange = useCallback((e) => setTopicCovered(e.target.value), []);
  const handleDurationChange = useCallback((e) => setDuration(e.target.value), []);
  const handleDetailedNotesChange = useCallback((e) => setDetailedNotes(e.target.value), []);
  const handleHomeworkChange = useCallback((e) => setHomework(e.target.value), []);
  const handleNextClassPrepChange = useCallback((e) => setNextClassPrep(e.target.value), []);
  const handleLeaveFilterCourseChange = useCallback((value) => setLeaveFilter(prev => ({ ...prev, course: value })), []);
  const handleLeaveFilterSemesterChange = useCallback((value) => setLeaveFilter(prev => ({ ...prev, semester: value })), []);
  const handleLeaveFilterStatusChange = useCallback((value) => setLeaveFilter(prev => ({ ...prev, status: value })), []);
  const handleResetFilters = useCallback(() => setLeaveFilter({ course: "all", semester: "all", status: "all" }), []);
  const handleMobileMenuToggle = useCallback(() => setMobileMenuOpen(prev => !prev), []);
  const handleMobileTabChange = useCallback((tab) => {
    setMobileMenuOpen(false);
    setActiveTab(tab);
  }, []);

  // Initialize classSummaryCourse with the first course if available
  useEffect(() => {
    if (courses.length > 0 && classSummaryCourse === null) {
      setClassSummaryCourse(courses[0].code);
    }
  }, [courses, classSummaryCourse]);

  const markAttendance = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [selectedCourse]: prev[selectedCourse].map(student =>
        student.id === studentId ? { ...student, status } : student
      )
    }));
  };

  const handleLeaveAction = useCallback((leaveId, action, comment) => {
    setStudentLeaveRequests(prev =>
      prev.map(leave =>
        leave.id === leaveId
          ? { ...leave, status: action, comments: comment || leave.comments }
          : leave
      )
    );
    setAlertModalContent({ title: "Leave Request Update", message: `Leave request ${leaveId} ${action}ed.` });
    setShowAlertModal(true);
    setShowLeaveActionModal(false);
    setCurrentLeaveAction({ leaveId: null, action: "", comment: "" });
  }, []);

  const handleViewLeaveDetails = useCallback((leaveRequest) => {
    setSelectedLeaveRequest(leaveRequest);
    setShowLeaveDetailsModal(true);
  }, []);

  const exportData = useCallback((format) => {
    console.log(`Exporting attendance data for ${selectedCourse} as ${format}`);
    setAlertModalContent({ title: "Export Successful", message: `Attendance data for ${selectedCourse} exported as ${format.toUpperCase()}.` });
    setShowAlertModal(true);
  }, [selectedCourse]);

  const exportLeaveData = useCallback((format) => {
    console.log(`Exporting leave data as ${format}`);
    setAlertModalContent({ title: "Export Successful", message: `Leave requests exported as ${format.toUpperCase()}.` });
    setShowAlertModal(true);
  }, []);

  const saveAttendance = useCallback(() => {
    const currentAttendance = attendanceData[selectedCourse];
    console.log("Saving attendance for course:", selectedCourse);
    console.log("Topic Discussed:", topicDiscussed);
    console.log("Remarks:", remarks);
    console.log("Student Attendance Records:", currentAttendance.map(s => ({
      id: s.id,
      rollNo: s.rollNo,
      name: s.name,
      status: s.status
    })));
    setAlertModalContent({ title: "Attendance Saved", message: `Attendance and class details saved for ${courses.find(c => c.code === selectedCourse)?.name}.` });
    setShowAlertModal(true);
    setTopicDiscussed("");
    setRemarks("");
  }, [selectedCourse, topicDiscussed, remarks, attendanceData, courses]);

  const handleSaveClassSummaryDraft = useCallback(() => {
    const classSummary = {
      course: classSummaryCourse,
      date: classSummaryDate,
      topicCovered: topicCovered,
      duration: duration,
      detailedNotes: detailedNotes,
      homework: homework,
      nextClassPrep: nextClassPrep,
      status: "draft"
    };
    console.log("Saving Class Summary Draft:", classSummary);
    setAlertModalContent({ title: "Class Summary Saved", message: "Class Summary saved as draft!" });
    setShowAlertModal(true);
  }, [classSummaryCourse, classSummaryDate, topicCovered, duration, detailedNotes, homework, nextClassPrep]);

  const handlePublishClassSummary = useCallback(() => {
    const classSummary = {
      course: classSummaryCourse,
      date: classSummaryDate,
      topicCovered: topicCovered,
      duration: duration,
      detailedNotes: detailedNotes,
      homework: homework,
      nextClassPrep: nextClassPrep,
      status: "published"
    };
    console.log("Publishing Class Summary:", classSummary);
    setAlertModalContent({ title: "Class Summary Published", message: "Class Summary published successfully!" });
    setShowAlertModal(true);
  }, [classSummaryCourse, classSummaryDate, topicCovered, duration, detailedNotes, homework, nextClassPrep]);

  const getStatusColor = (status) => {
    switch (status) {
      case "present": return "bg-green-400 text-green-800";
      case "absent": return "bg-red-400 text-red-800";
      case "late": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLeaveStatusColor = (status) => {
    switch (status) {
      case "approved": return "bg-green-400 text-green-800";
      case "rejected": return "bg-red-400 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDisciplineColor = (code) => {
    switch (code) {
      case "normal": return "bg-green-500";
      case "cautioned": return "bg-yellow-500";
      case "flagged": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getLastClassIcon = (status) => {
    switch (status) {
      case "present": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "absent": return <XCircle className="h-4 w-4 text-red-600" />;
      case "late": return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredLeaveRequests = studentLeaveRequests.filter((leave) => {
    return (
      (leaveFilter.course === "all" || leave.course === leaveFilter.course) &&
      (leaveFilter.semester === "all" || leave.semester === leaveFilter.semester) &&
      (leaveFilter.status === "all" || leave.status === leaveFilter.status)
    );
  });

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header with responsive date display */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">Attendance & Class Summary</h1>
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
          <Calendar className="h-5 w-5 text-blue-600" />
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

      {/* Enhanced Responsive Tabs */}
      <Tabs defaultValue="mark-attendance" className="space-y-6">
        {/* Mobile Tabs Dropdown */}
        <div className="sm:hidden bg-white relative">
          <Button
            variant="outline"
            className="w-full bg-white justify-between"
            onClick={handleMobileMenuToggle}
          >
            <span>Select View</span>
            {mobileMenuOpen ? <ChevronUp className="h-4 bg-white w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          {mobileMenuOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="flex bg-white flex-col p-2 space-y-1 w-full">
                <TabsTrigger
                  value="mark-attendance"
                  className="w-full justify-start bg-white px-4 py-2 text-sm"
                  onClick={() => handleMobileTabChange("mark-attendance")}
                  active={activeTab === "mark-attendance"} // Pass active prop
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Attendance
                </TabsTrigger>
                <TabsTrigger
                  value="attendance-reports"
                  className="w-full justify-start bg-white px-4 py-2 text-sm"
                  onClick={() => handleMobileTabChange("attendance-reports")}
                  active={activeTab === "attendance-reports"} // Pass active prop
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Reports
                </TabsTrigger>
                <TabsTrigger
                  value="class-summary"
                  className="w-full justify-start bg-white px-4 py-2 text-sm"
                  onClick={() => handleMobileTabChange("class-summary")}
                  active={activeTab === "class-summary"} // Pass active prop
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Class Summary
                </TabsTrigger>
                <TabsTrigger
                  value="student-leave"
                  className="w-full justify-start bg-white px-4 py-2 text-sm"
                  onClick={() => handleMobileTabChange("student-leave")}
                  active={activeTab === "student-leave"} // Pass active prop
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Leave Requests
                </TabsTrigger>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Tabs */}
        <TabsList className="hidden sm:grid w-full grid-cols-4 gap-2 bg-gray-50 p-1 rounded-lg" activeTab={activeTab} setActiveTab={setActiveTab}>
          <TabsTrigger
            value="mark-attendance"
            className="py-2 text-sm flex items-center justify-center"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            <span>Mark Attendance</span>
          </TabsTrigger>
          <TabsTrigger
            value="attendance-reports"
            className="py-2 text-sm flex items-center justify-center"
          >
            <FileText className="h-4 w-4 mr-2" />
            <span>Reports</span>
          </TabsTrigger>
          <TabsTrigger
            value="class-summary"
            className="py-2 text-sm flex items-center justify-center"
          >
            <Calendar className="h-4 w-4 mr-2" />
            <span>Class Summary</span>
          </TabsTrigger>
          <TabsTrigger
            value="student-leave"
            className="py-2 text-sm flex items-center justify-center"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            <span>Leave Requests</span>
          </TabsTrigger>
        </TabsList>

        {/* Mark Attendance Tab */}
        <TabsContent value="mark-attendance" activeTab={activeTab} className="pt-4 sm:pt-6 space-y-6">
          {/* Course Selection - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courses.map((course) => (
              <Card
                key={course.code}
                className={`cursor-pointer transition-all hover:border-blue-300 ${
                  selectedCourse === course.code
                    ? 'ring-2 ring-blue-500 border-blue-300'
                    : 'border-gray-100'
                }`}
                onClick={() => setSelectedCourse(course.code)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg sm:text-xl">{course.name}</CardTitle>
                      <Badge variant="outline" className="mt-2">{course.code}</Badge>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.students} students</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Student Attendance List */}
          <Card className="border border-gray-200">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">
                    {courses.find(c => c.code === selectedCourse)?.name} Attendance
                  </CardTitle>
                  <CardDescription>
                    Mark attendance for today's class
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() => exportData('csv')}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    <span className="text-xs sm:text-sm">Export CSV</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() => exportData('pdf')}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    <span className="text-xs sm:text-sm">Export PDF</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendanceData[selectedCourse]?.map((student) => (
                  <div key={student.id} className="p-4 rounded-lg shadow-2xs transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${getDisciplineColor(student.disciplineCode)}`}></div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium">{student.name}</p>
                            {getLastClassIcon(student.lastClassStatus)}
                          </div>
                          <p className="text-sm text-gray-600">{student.rollNo}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        <div className="flex gap-4">
                          <div className="text-center">
                            <p className="text-xs text-gray-500">CGPA</p>
                            <p className="font-medium text-sm">{student.cgpa}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500">Attendance</p>
                            <p className={`font-medium text-sm ${student.attendancePercent < 75 ? 'text-red-600' : 'text-green-600'}`}>
                              {student.attendancePercent}%
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(student.status)}>
                            {student.status}
                          </Badge>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant={student.status === "present" ? "default" : "outline"}
                              onClick={() => markAttendance(student.id, "present")}
                              className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span className="sr-only sm:not-sr-only sm:ml-1">Present</span>
                            </Button>
                            <Button
                              size="sm"
                              variant={student.status === "late" ? "default" : "outline"}
                              onClick={() => markAttendance(student.id, "late")}
                              className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                            >
                              <AlertCircle className="h-4 w-4" />
                              <span className="sr-only sm:not-sr-only sm:ml-1">Late</span>
                            </Button>
                            <Button
                              size="sm"
                              variant={student.status === "absent" ? "default" : "outline"}
                              onClick={() => markAttendance(student.id, "absent")}
                              className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                            >
                              <XCircle className="h-4 w-4" />
                              <span className="sr-only sm:not-sr-only sm:ml-1">Absent</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Topic and Remarks Section */}
              <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label htmlFor="topicDiscussed" className="block text-sm font-medium mb-2">Topic Discussed Today</label>
                  <Input
                    id="topicDiscussed"
                    placeholder="Enter topic covered in today's class"
                    value={topicDiscussed}
                    onChange={handleTopicDiscussedChange}
                  />
                </div>
                <div>
                  <label htmlFor="remarks" className="block text-sm font-medium mb-2">Remarks (Optional)</label>
                  <Textarea
                    id="remarks"
                    placeholder="Add any additional remarks about today's class"
                    value={remarks}
                    onChange={handleRemarksChange}
                    rows={3}
                  />
                </div>
              </div>
              <Button className="w-full mt-4" onClick={saveAttendance}>
                Save Attendance & Class Details
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="attendance-reports" activeTab={activeTab} className="pt-4 sm:pt-6">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Attendance Reports & Analytics</CardTitle>
              <CardDescription>View detailed attendance statistics and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <div className="text-sm text-gray-600">Average Attendance</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <div className="text-sm text-gray-600">Classes Conducted</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">12</div>
                  <div className="text-sm text-gray-600">Low Attendance Alerts</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">8</div>
                  <div className="text-sm text-gray-600">Students Below 75%</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Detailed Report
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download Analytics
                </Button>
              </div>

              {/* Sample Chart Placeholder */}
              <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Attendance Trend (Last 30 Days)</h3>
                  <Select
                    value={selectedCourse}
                    onValueChange={setSelectedCourse}
                  >
                    {courses.map(course => (
                      <SelectItem key={course.code} value={course.code}>
                        {course.code}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="h-64 bg-white rounded border border-gray-200 p-4 flex items-center justify-center text-gray-400">
                  [Attendance Chart Placeholder]
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Class Summary Tab */}
        <TabsContent value="class-summary" activeTab={activeTab} className="pt-4 sm:pt-6">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Class Summary</CardTitle>
              <CardDescription>Add comprehensive notes and summary for today's class</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="classSummaryCourse" className="block text-sm font-medium mb-2">Course</label>
                  <Select
                    id="classSummaryCourse"
                    value={classSummaryCourse}
                    onValueChange={handleClassSummaryCourseChange}
                    className="border border-gray-300"
                  >
                    {courses.map(course => (
                      <SelectItem key={course.code} value={course.code}>
                        {course.name} ({course.code})
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div>
                  <label htmlFor="classSummaryDate" className="block text-sm font-medium  mb-2">Date</label>
                  <Input
                    id="classSummaryDate"
                    className="border border-gray-300"
                    type="date"
                    value={classSummaryDate}
                    onChange={handleClassSummaryDateChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="topicCovered" className="block text-sm font-medium mb-2">Topic Covered</label>
                  <Input
                    id="topicCovered"
                    className="border border-gray-300"
                    placeholder="Enter topic covered in class"
                    value={topicCovered}
                    onChange={handleTopicCoveredChange}
                  />
                </div>
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium mb-2">Duration</label>
                  <Input
                    id="duration"
                    className="border border-gray-300"
                    placeholder="Class duration (e.g., 50 minutes)"
                    value={duration}
                    onChange={handleDurationChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="detailedNotes" className="block text-sm font-medium mb-2">Detailed Class Notes</label>
                <Textarea
                  id="detailedNotes"
                  className="min-h-[150px] border border-gray-300"
                  placeholder="Add comprehensive class notes, key concepts discussed, student interactions, etc."
                  value={detailedNotes}
                  onChange={handleDetailedNotesChange}
                />
              </div>

              <div>
                <label htmlFor="homework" className="block text-sm font-medium mb-2">Homework/Assignment</label>
                <Input
                  id="homework"
                  className="border border-gray-300"
                  placeholder="Assignment details and due date"
                  value={homework}
                  onChange={handleHomeworkChange}
                />
              </div>

              <div>
                <label htmlFor="nextClassPrep" className="block text-sm font-medium mb-2">Next Class Preparation</label>
                <Textarea
                  id="nextClassPrep"
                  placeholder="Topics to prepare for next class, materials needed, etc."
                  className="min-h-[100px] border border-gray-300"
                  value={nextClassPrep}
                  onChange={handleNextClassPrepChange}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleSaveClassSummaryDraft}>Save Draft</Button>
                <Button onClick={handlePublishClassSummary}>Publish Summary</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Student Leave Tab */}
        <TabsContent value="student-leave" activeTab={activeTab} className="pt-4 sm:pt-6 space-y-6">
          <Card className="border border-gray-200">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center  justify-between gap-4">
                <div>
                  <CardTitle>Student Leave Requests</CardTitle>
                  <CardDescription>Review and approve student leave applications</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportLeaveData('csv')}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    <span className="text-xs sm:text-sm">Export CSV</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportLeaveData('pdf')}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    <span className="text-xs sm:text-sm">Export PDF</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label htmlFor="leaveCourseFilter" className="block text-sm font-medium mb-2">Course</label>
                  <Select
                    id="leaveCourseFilter"
                    value={leaveFilter.course}
                    onValueChange={handleLeaveFilterCourseChange}
                  >
                    <SelectItem value="all">All Courses</SelectItem>
                    {courses.map(course => (
                      <SelectItem key={course.code} value={course.code}>
                        {course.code}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div>
                  <label htmlFor="leaveSemesterFilter" className="block text-sm font-medium mb-2">Semester</label>
                  <Select
                    id="leaveSemesterFilter"
                    value={leaveFilter.semester}
                    onValueChange={handleLeaveFilterSemesterChange}
                  >
                    <SelectItem value="all">All Semesters</SelectItem>
                    <SelectItem value="3rd">3rd Semester</SelectItem>
                    <SelectItem value="5th">5th Semester</SelectItem>
                    <SelectItem value="7th">7th Semester</SelectItem>
                    </Select>
                </div>
                <div>
                  <label htmlFor="leaveStatusFilter" className="block text-sm font-medium mb-2">Status</label>
                  <Select
                    id="leaveStatusFilter"
                    value={leaveFilter.status}
                    onValueChange={handleLeaveFilterStatusChange}
                  >
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleResetFilters}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Reset Filters
                  </Button>
                </div>
              </div>

              {/* Leave Requests Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="w-[180px]">Student</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Leave Details</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeaveRequests.length > 0 ? (
                      filteredLeaveRequests.map((leave) => (
                        <TableRow key={leave.id}>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span>{leave.studentName}</span>
                              <span className="text-sm text-gray-600">{leave.studentId}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{leave.course}</span>
                              <span className="text-sm text-gray-600">{leave.semester}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{leave.leaveType}</Badge>
                                <span className="text-sm">
                                  {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm mt-1">{leave.reason}</p>
                              {leave.attachment && (
                                <div className="flex items-center text-sm text-blue-600 mt-1">
                                  <FileText className="h-4 w-4 mr-1" />
                                  <span>Attachment</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getLeaveStatusColor(leave.status)}>
                              {leave.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {/* Action buttons with modal trigger */}
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => {
                                  setCurrentLeaveAction({ leaveId: leave.id, action: "approved", comment: "" });
                                  setShowLeaveActionModal(true);
                                }}
                                disabled={leave.status !== "pending"} // Only enable if pending
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => {
                                  setCurrentLeaveAction({ leaveId: leave.id, action: "rejected", comment: "" });
                                  setShowLeaveActionModal(true);
                                }}
                                disabled={leave.status !== "pending"} // Only enable if pending
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => handleViewLeaveDetails(leave)} // Open details modal
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                          No leave requests found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Leave Statistics */}
              <div className="mt-6  grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardDescription>Pending Requests</CardDescription>
                    <CardTitle className="text-3xl">
                      {studentLeaveRequests.filter(l => l.status === "pending").length}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardDescription>Approved This Month</CardDescription>
                    <CardTitle className="text-3xl">
                      {studentLeaveRequests.filter(l =>
                        l.status === "approved" &&
                        new Date(l.appliedDate).getMonth() === new Date().getMonth()
                      ).length}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardDescription>Rejection Rate</CardDescription>
                    <CardTitle className="text-3xl">
                      {studentLeaveRequests.length > 0
                        ? `${Math.round(
                            (studentLeaveRequests.filter(l => l.status === "rejected").length /
                            studentLeaveRequests.length) * 100
                          )}%`
                        : "0%"}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Custom Alert Dialog */}
      <AlertDialog
        isOpen={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        title={alertModalContent.title}
        message={alertModalContent.message}
      />

      {/* Leave Action Confirmation Modal */}
      <LeaveActionModal
        isOpen={showLeaveActionModal}
        onClose={() => setShowLeaveActionModal(false)}
        leaveRequest={studentLeaveRequests.find(req => req.id === currentLeaveAction.leaveId)}
        actionType={currentLeaveAction.action}
        onConfirm={(id, action, comment) => handleLeaveAction(id, action, comment)}
      />

      {/* Leave Details Read-Only Modal */}
      <LeaveDetailsModal
        isOpen={showLeaveDetailsModal}
        onClose={() => setShowLeaveDetailsModal(false)}
        leaveRequest={selectedLeaveRequest}
      />
    </div>
  );
};

export default AttendanceModule;