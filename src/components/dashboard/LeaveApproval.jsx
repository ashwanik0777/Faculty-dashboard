import { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  User,
  Upload,
  Download,
  Filter,
  Eye,
} from "lucide-react";

// --- Inline UI Components ---

// Custom Toast placeholder (replace with a full implementation if needed)
const useToast = () => {
  return {
    toast: ({ title, description, variant }) => {
      console.log(`Toast: ${title} - ${description} (Variant: ${variant})`);
      // In a real application, you'd render a visible toast notification here.
      // For now, it just logs to the console.
      alert(`${title}: ${description}`); // Simple alert for demonstration
    },
  };
};

// Card Component (Inline)
const CustomCard = ({ children, className = "" }) => (
  <div
    className={`rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm ${className}`}
  >
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
const CustomBadge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
  >
    {children}
  </span>
);

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

// Input Component (Inline)
const CustomInput = ({ className = "", type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

// Label Component (Inline)
const CustomLabel = ({ children, htmlFor, className = "" }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
  >
    {children}
  </label>
);

// Textarea Component (Inline)
const CustomTextarea = ({ className = "", ...props }) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

// Select Component (Inline - simplified for this example)
// Note: A full custom select would involve more complex state management for open/closed and selected value
const CustomSelect = ({ children, value, onValueChange, placeholder }) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {children}
    </select>
  );
};

const CustomSelectItem = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

// Table Components (Inline)
const CustomTable = ({ children, className = "" }) => (
  <div className="relative w-full overflow-auto">
    <table className={`w-full caption-bottom text-sm ${className}`}>
      {children}
    </table>
  </div>
);

const CustomTableHeader = ({ children, className = "" }) => (
  <thead className={`[&_tr]:border-b ${className}`}>
    {children}
  </thead>
);

const CustomTableBody = ({ children, className = "" }) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`}>
    {children}
  </tbody>
);

const CustomTableRow = ({ children, className = "" }) => (
  <tr className={`border-b transition-colors hover:bg-gray-100/50 data-[state=selected]:bg-gray-100 ${className}`}>
    {children}
  </tr>
);

const CustomTableHead = ({ children, className = "" }) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </th>
);

const CustomTableCell = ({ children, className = "" }) => (
  <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </td>
);


// --- Main Component ---

const LeaveApproval = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState("apply-leave"); // State for active tab
  const [leaveForm, setLeaveForm] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    proofRequired: false,
  });

  // Leave balance data
  const leaveBalance = {
    CL: { used: 2, total: 12, remaining: 10 },
    EL: { used: 5, total: 15, remaining: 10 },
    DL: { used: 0, total: 5, remaining: 5 },
    AL: { used: 1, total: 10, remaining: 9 },
    ML: { used: 0, total: 30, remaining: 30 },
  };

  // Leave history data
  const [leaveHistory] = useState([
    {
      id: 1,
      dateRange: "2024-04-15 to 2024-04-16",
      leaveType: "CL",
      duration: "2 days",
      status: "approved",
      remarks: "Personal work",
      appliedDate: "2024-04-10",
      approvedBy: "Dr. Sharma (HoD)",
    },
    {
      id: 2,
      dateRange: "2024-05-10 to 2024-05-12",
      leaveType: "ML",
      duration: "3 days",
      status: "approved",
      remarks: "Medical treatment",
      appliedDate: "2024-05-08",
      approvedBy: "Dr. Sharma (HoD)",
    },
    {
      id: 3,
      dateRange: "2024-07-01 to 2024-07-02",
      leaveType: "EL",
      duration: "2 days",
      status: "pending",
      remarks: "Family function",
      appliedDate: "2024-06-25",
      approvedBy: "-",
    },
  ]);

  // Approval requests (for HoD/Dean view)
  const [approvalRequests] = useState([
    {
      id: 1,
      facultyName: "Dr. Rajesh Kumar",
      department: "Computer Science",
      leaveType: "CL",
      dateRange: "2024-06-15 to 2024-06-16",
      duration: "2 days",
      status: "pending",
      reason: "Attending conference",
      appliedDate: "2024-06-10",
      proofAttached: true,
    },
    {
      id: 2,
      facultyName: "Dr. Priya Sharma",
      department: "Mathematics",
      leaveType: "ML",
      dateRange: "2024-06-18 to 2024-06-20",
      duration: "3 days",
      status: "pending",
      reason: "Medical checkup",
      appliedDate: "2024-06-12",
      proofAttached: true,
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLeaveTypeColor = (type) => {
    const colors = {
      CL: "bg-blue-100 text-blue-800",
      EL: "bg-green-100 text-green-800",
      DL: "bg-purple-100 text-purple-800",
      AL: "bg-orange-100 text-orange-800",
      ML: "bg-red-100 text-red-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const handleLeaveTypeChange = (value) => {
    setLeaveForm({
      ...leaveForm,
      leaveType: value,
      proofRequired: value === "ML" || value === "DL",
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitLeave = () => {
    if (
      !leaveForm.leaveType ||
      !leaveForm.fromDate ||
      !leaveForm.toDate ||
      !leaveForm.reason
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    if (leaveForm.proofRequired && !selectedFile) {
      toast({
        title: "Proof Required",
        description: "Please upload supporting document for this leave type",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Leave Submitted",
      description: "Your leave request has been submitted for approval",
    });

    // Reset form
    setLeaveForm({
      leaveType: "",
      fromDate: "",
      toDate: "",
      reason: "",
      proofRequired: false,
    });
    setSelectedFile(null);
  };

  const handleApprovalAction = (id, action, remarks) => {
    toast({
      title: `Leave ${action}`,
      description: `Request #${id} has been ${action}${
        remarks ? ` with remarks: ${remarks}` : ""
      }`,
    });
    // In a real app, you'd update the approvalRequests state here
  };

  const calculateProgress = (used, total) => {
    return Math.round((used / total) * 100);
  };

  const downloadLeaveRecord = () => {
    toast({
      title: "Download Initiated",
      description: "Your leave record is being prepared for download",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-900">
          Faculty Leave Management
        </h1>
        <CustomButton variant="outline" onClick={downloadLeaveRecord}>
          <Download className="h-4 w-4 mr-2" />
          Download Full Record
        </CustomButton>
      </div>

      <div className="space-y-6">
        <CustomTabsList className="grid w-full grid-cols-4">
          <CustomTabsTrigger value="apply-leave" activeTab={activeTab} setActiveTab={setActiveTab}>Apply Leave</CustomTabsTrigger>
          <CustomTabsTrigger value="my-balance" activeTab={activeTab} setActiveTab={setActiveTab}>My Balance</CustomTabsTrigger>
          <CustomTabsTrigger value="my-history" activeTab={activeTab} setActiveTab={setActiveTab}>My History</CustomTabsTrigger>
          <CustomTabsTrigger value="approvals" activeTab={activeTab} setActiveTab={setActiveTab}>Approvals</CustomTabsTrigger>
        </CustomTabsList>

        {/* Apply Leave Tab */}
        <CustomTabsContent value="apply-leave" activeTab={activeTab}>
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle>Apply for Leave</CustomCardTitle>
              <CustomCardDescription>
                Submit your leave request with required details
              </CustomCardDescription>
            </CustomCardHeader>
            <CustomCardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <CustomLabel htmlFor="leaveType">Leave Type *</CustomLabel>
                  <CustomSelect
                    value={leaveForm.leaveType}
                    onValueChange={handleLeaveTypeChange}
                    placeholder="Select leave type"
                  >
                    <CustomSelectItem value="CL">
                      CL - Casual Leave
                    </CustomSelectItem>
                    <CustomSelectItem value="EL">
                      EL - Earned Leave
                    </CustomSelectItem>
                    <CustomSelectItem value="DL">
                      DL - Duty Leave
                    </CustomSelectItem>
                    <CustomSelectItem value="AL">
                      AL - Academic Leave
                    </CustomSelectItem>
                    <CustomSelectItem value="ML">
                      ML - Medical Leave
                    </CustomSelectItem>
                  </CustomSelect>
                </div>
                <div>
                  <CustomLabel htmlFor="fromDate">From Date *</CustomLabel>
                  <CustomInput
                    id="fromDate"
                    type="date"
                    value={leaveForm.fromDate}
                    onChange={(e) =>
                      setLeaveForm({ ...leaveForm, fromDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <CustomLabel htmlFor="toDate">To Date *</CustomLabel>
                  <CustomInput
                    id="toDate"
                    type="date"
                    value={leaveForm.toDate}
                    onChange={(e) =>
                      setLeaveForm({ ...leaveForm, toDate: e.target.value })
                    }
                  />
                </div>
                {leaveForm.proofRequired && (
                  <div>
                    <CustomLabel htmlFor="proof">
                      Upload Proof * (PDF/Image)
                    </CustomLabel>
                    <div className="flex items-center space-x-2">
                      <CustomInput
                        id="proof"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                      />
                      <Upload className="h-5 w-5 text-gray-400" />
                    </div>
                    {selectedFile && (
                      <p className="text-sm text-green-600 mt-1">
                        File selected: {selectedFile.name}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div>
                <CustomLabel htmlFor="reason">Reason *</CustomLabel>
                <CustomTextarea
                  id="reason"
                  placeholder="Please provide reason for leave"
                  value={leaveForm.reason}
                  onChange={(e) =>
                    setLeaveForm({ ...leaveForm, reason: e.target.value })
                  }
                />
              </div>
              <CustomButton onClick={handleSubmitLeave} className="w-full">
                Submit Leave Request
              </CustomButton>
            </CustomCardContent>
          </CustomCard>
        </CustomTabsContent>

        {/* My Balance Tab */}
        <CustomTabsContent value="my-balance" activeTab={activeTab}>
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle>Leave Balance Overview</CustomCardTitle>
              <CustomCardDescription>
                Your current leave quota and utilization
              </CustomCardDescription>
            </CustomCardHeader>
            <CustomCardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(leaveBalance).map(([type, balance]) => (
                  <CustomCard key={type} className="border border-gray-200">
                    <CustomCardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <CustomBadge className={getLeaveTypeColor(type)}>
                          {type}
                        </CustomBadge>
                        <span className="text-sm text-gray-600">
                          {balance.remaining}/{balance.total} left
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Used: {balance.used}</span>
                          <span>
                            {calculateProgress(balance.used, balance.total)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${calculateProgress(
                                balance.used,
                                balance.total
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </CustomCardContent>
                  </CustomCard>
                ))}
              </div>
            </CustomCardContent>
          </CustomCard>
        </CustomTabsContent>

        {/* My History Tab */}
        <CustomTabsContent value="my-history" activeTab={activeTab}>
          <CustomCard>
            <CustomCardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CustomCardTitle>Leave History</CustomCardTitle>
                  <CustomCardDescription>
                    Your complete leave application history
                  </CustomCardDescription>
                </div>
                <div className="flex space-x-2">
                  <CustomButton variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </CustomButton>
                  <CustomButton variant="outline" size="sm" onClick={downloadLeaveRecord}>
                    <Download className="h-4 w-4 mr-1" />
                    Export PDF
                  </CustomButton>
                </div>
              </div>
            </CustomCardHeader>
            <CustomCardContent>
              <CustomTable>
                <CustomTableHeader>
                  <CustomTableRow>
                    <CustomTableHead>Date Range</CustomTableHead>
                    <CustomTableHead>Type</CustomTableHead>
                    <CustomTableHead>Duration</CustomTableHead>
                    <CustomTableHead>Status</CustomTableHead>
                    <CustomTableHead>Approved By</CustomTableHead>
                    <CustomTableHead>Remarks</CustomTableHead>
                  </CustomTableRow>
                </CustomTableHeader>
                <CustomTableBody>
                  {leaveHistory.map((leave) => (
                    <CustomTableRow key={leave.id}>
                      <CustomTableCell className="font-medium">
                        {leave.dateRange}
                      </CustomTableCell>
                      <CustomTableCell>
                        <CustomBadge className={getLeaveTypeColor(leave.leaveType)}>
                          {leave.leaveType}
                        </CustomBadge>
                      </CustomTableCell>
                      <CustomTableCell>{leave.duration}</CustomTableCell>
                      <CustomTableCell>
                        <CustomBadge className={getStatusColor(leave.status)}>
                          {leave.status.toUpperCase()}
                        </CustomBadge>
                      </CustomTableCell>
                      <CustomTableCell>{leave.approvedBy}</CustomTableCell>
                      <CustomTableCell>{leave.remarks}</CustomTableCell>
                    </CustomTableRow>
                  ))}
                </CustomTableBody>
              </CustomTable>
            </CustomCardContent>
          </CustomCard>
        </CustomTabsContent>

        {/* Approvals Tab (for HoD/Dean) */}
        <CustomTabsContent value="approvals" activeTab={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <CustomCard>
              <CustomCardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">8</div>
                <div className="text-sm text-gray-600">Pending Approvals</div>
                <Clock className="h-6 w-6 mx-auto mt-2 text-yellow-600" />
              </CustomCardContent>
            </CustomCard>
            <CustomCard>
              <CustomCardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">45</div>
                <div className="text-sm text-gray-600">Approved This Month</div>
                <CheckCircle className="h-6 w-6 mx-auto mt-2 text-green-600" />
              </CustomCardContent>
            </CustomCard>
            <CustomCard>
              <CustomCardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">3</div>
                <div className="text-sm text-gray-600">Rejected This Month</div>
                <XCircle className="h-6 w-6 mx-auto mt-2 text-red-600" />
              </CustomCardContent>
            </CustomCard>
          </div>

          <div className="space-y-4">
            {approvalRequests.map((request) => (
              <CustomCard key={request.id}>
                <CustomCardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CustomCardTitle className="text-lg flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        {request.facultyName}
                      </CustomCardTitle>
                      <CustomCardDescription>
                        {request.department} • {request.leaveType}
                      </CustomCardDescription>
                    </div>
                    <CustomBadge className={getStatusColor(request.status)}>
                      {request.status.toUpperCase()}
                    </CustomBadge>
                  </div>
                </CustomCardHeader>
                <CustomCardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                        <span className="text-sm font-medium">Leave Period</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {request.dateRange}
                      </p>
                      <p className="text-sm text-gray-500">
                        Duration: {request.duration}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <Clock className="h-4 w-4 mr-2 text-gray-600" />
                        <span className="text-sm font-medium">Applied On</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {request.appliedDate}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Reason:</h4>
                    <p className="text-sm text-gray-700 italic">
                      "{request.reason}"
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {request.proofAttached && (
                        <div className="flex items-center text-sm text-green-600">
                          <FileText className="h-4 w-4 mr-1" />
                          Proof document attached
                          <CustomButton variant="link" size="sm" className="ml-2 p-0 h-auto">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </CustomButton>
                        </div>
                      )}
                    </div>
                    {request.status === "pending" && (
                      <div className="flex space-x-2">
                        <CustomButton
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleApprovalAction(request.id, "rejected")
                          }
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </CustomButton>
                        <CustomButton
                          size="sm"
                          onClick={() =>
                            handleApprovalAction(request.id, "approved")
                          }
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </CustomButton>
                      </div>
                    )}
                  </div>
                </CustomCardContent>
              </CustomCard>
            ))}
          </div>
        </CustomTabsContent>
      </div>
    </div>
  );
};

export default LeaveApproval;