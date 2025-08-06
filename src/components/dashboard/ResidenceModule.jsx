import React, { useState } from "react";
import {
  Home,
  Zap,
  CreditCard,
  Wrench,
  Camera,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  History,
  Plus,
} from "lucide-react";

const ResidenceModule = () => {
  const [selectedComplaintType, setSelectedComplaintType] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [activeTab, setActiveTab] = useState("residence-details"); // State to manage active tab

  const residenceDetails = {
    block: "Faculty Quarters - Block A",
    roomNumber: "A-205",
    type: "2BHK",
    occupancy: "Family",
    allottedDate: "2020-08-01",
  };

  const electricityDetails = {
    currentBalance: 50,
    currentUnits: 120,
    lastRecharge: "2024-06-20",
    monthlyConsumption: 150,
  };

  const rechargeHistory = [
    { id: 1, date: "2024-06-20", amount: 1000, units: 50, mode: "Online", status: "Completed" },
    { id: 2, date: "2024-05-15", amount: 1500, units: 75, mode: "UPI", status: "Completed" },
    { id: 3, date: "2024-04-10", amount: 2000, units: 100, mode: "Net Banking", status: "Completed" },
  ];

  const complaints = [
    {
      id: 1,
      type: "Electrical",
      description: "AC not working in bedroom",
      status: "In Process",
      submittedDate: "2024-06-22",
      priority: "High",
      technicianAssigned: "Ravi Kumar",
      expectedResolution: "2024-06-25",
    },
    {
      id: 2,
      type: "Plumbing",
      description: "Kitchen sink tap leaking",
      status: "Resolved",
      submittedDate: "2024-06-18",
      priority: "Medium",
      technicianAssigned: "Suresh Singh",
      resolvedDate: "2024-06-20",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-100 text-blue-800";
      case "In Process":
        return "bg-yellow-100 text-yellow-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const submitComplaint = () => {
    console.log("Submitting complaint");
    // Actual implementation for complaint submission would go here
    alert(`Complaint Submitted!\nType: ${selectedComplaintType}\nDescription: ${complaintDescription}`);
    setSelectedComplaintType("");
    setComplaintDescription("");
  };

  const processRecharge = () => {
    console.log("Processing recharge of ₹", rechargeAmount);
    // Actual implementation for recharge processing would go here
    alert(`Recharging ₹${rechargeAmount} for electricity.`);
    setRechargeAmount("");
  };

  // Helper for Card component structure
  const Card = ({ children, className = "" }) => (
    <div className={`rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm ${className}`}>
      {children}
    </div>
  );
  const CardHeader = ({ children, className = "" }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
  );
  const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
  );
  const CardDescription = ({ children, className = "" }) => (
    <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
  );
  const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
  );

  // Helper for Button component structure
  const Button = ({ variant = "default", size = "default", className = "", onClick, children }) => {
    let baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    let variantStyles = "";
    let sizeStyles = "";

    switch (variant) {
      case "default":
        variantStyles = "bg-primary text-primary-foreground hover:bg-primary/90";
        break;
      case "outline":
        variantStyles = "border border-gray-300 bg-background hover:bg-accent hover:text-accent-foreground";
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
      <button className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`} onClick={onClick}>
        {children}
      </button>
    );
  };

  // Helper for Badge component structure
  const Badge = ({ className = "", children }) => (
    <span className={`inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  );

  // Helper for Tabs component structure
  // MODIFIED: Accepts `value` and `onValueChange` props
  const Tabs = ({ value, onValueChange, className = "", children }) => {
    return (
      <div className={className}>
        {/* Render TabsList and pass onValueChange and current active tab */}
        {children.find(child => child.type === TabsList && React.isValidElement(child)) &&
          React.cloneElement(children.find(child => child.type === TabsList), { onTabChange: onValueChange, currentTab: value })}
        {/* Render TabsContent based on currentTab */}
        {children.filter(child => child.type === TabsContent).map(content =>
          React.cloneElement(content, { currentTab: value, key: content.props.value })
        )}
      </div>
    );
  };

  // MODIFIED: Accepts onTabChange and currentTab props
  const TabsList = ({ onTabChange, currentTab, className = "", children }) => (
    <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 bg-gray-100 text-muted-foreground ${className}`}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { onClick: () => onTabChange(child.props.value), isActive: currentTab === child.props.value })
      )}
    </div>
  );

  const TabsTrigger = ({ value, onClick, isActive, children }) => (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-22 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm ${isActive ? 'bg-white text-foreground shadow-sm' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  const TabsContent = ({ value, currentTab, className = "", children }) => (
    <div className={`${currentTab === value ? '' : 'hidden'} mt-2 ring-offset-backgroundfocus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}>
      {children}
    </div>
  );

  // Helper for Input component structure
  const Input = ({ className = "", type = "text", value, onChange, placeholder }) => (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );

  // Helper for Textarea component structure
  const Textarea = ({ className = "", value, onChange, placeholder, rows }) => (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
    ></textarea>
  );

  // Helper for Progress component structure
  const Progress = ({ value, className = "" }) => (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-secondary ${className}`}>
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );


  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-900">Residential Status & Electricity</h1>

      {/* MODIFIED: Use `value` and `onValueChange` */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="residence-details">Residence Details</TabsTrigger>
          <TabsTrigger value="electricity">Electricity Recharge</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="residence-details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Home className="h-5 w-5 mr-2 text-blue-600" />
                Residence Information
              </CardTitle>
              <CardDescription>Your current residence details and allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold mb-2">Block & Location</h3>
                  <p className="text-gray-700">{residenceDetails.block}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold mb-2">Room/Flat Number</h3>
                  <p className="text-gray-700">{residenceDetails.roomNumber}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold mb-2">Type</h3>
                  <p className="text-gray-700">{residenceDetails.type}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold mb-2">Occupancy</h3>
                  <p className="text-gray-700">{residenceDetails.occupancy}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold mb-2">Allotted Date</h3>
                  <p className="text-gray-700">{residenceDetails.allottedDate}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold mb-2">Status</h3>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* These buttons should update activeTab */}
                <Button variant="outline" className="h-20 flex flex-col" onClick={() => setActiveTab('electricity')}>
                  <Zap className="h-6 w-6 mb-2" />
                  <span className="text-xs">Recharge Electricity</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col" onClick={() => setActiveTab('maintenance')}>
                  <Wrench className="h-6 w-6 mb-2" />
                  <span className="text-xs">Report Issue</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col" onClick={() => setActiveTab('history')}>
                  <History className="h-6 w-6 mb-2" />
                  <span className="text-xs">View History</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <Home className="h-6 w-6 mb-2" />
                  <span className="text-xs">Update Details</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="electricity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Balance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                  Current Electricity Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">₹{electricityDetails.currentBalance}</div>
                    <div className="text-sm text-gray-600">Current Balance</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{electricityDetails.currentUnits}</div>
                    <div className="text-sm text-gray-600">Units Remaining</div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Monthly Usage Progress</span>
                    <span>{electricityDetails.monthlyConsumption} units</span>
                  </div>
                  <Progress value={(electricityDetails.monthlyConsumption - electricityDetails.currentUnits) / electricityDetails.monthlyConsumption * 100} className="h-2" />
                </div>
                <div className="text-sm text-gray-600">
                  Last Recharge: {electricityDetails.lastRecharge}
                </div>
              </CardContent>
            </Card>

            {/* Recharge Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
                  Electricity Recharge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="rechargeAmount" className="block text-sm font-medium mb-2">Amount (₹)</label>
                  <Input
                    id="rechargeAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={rechargeAmount}
                    onChange={(e) => setRechargeAmount(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" onClick={() => setRechargeAmount("1000")}>₹1000</Button>
                  <Button variant="outline" size="sm" onClick={() => setRechargeAmount("2000")}>₹2000</Button>
                  <Button variant="outline" size="sm" onClick={() => setRechargeAmount("3000")}>₹3000</Button>
                </div>
                <div>
                  <label htmlFor="paymentMode" className="block text-sm font-medium mb-2">Payment Mode</label>
                  <select id="paymentMode" className="w-full p-2 border border-gray-200 rounded-md">
                    <option>UPI</option>
                    <option>Net Banking</option>
                    <option>Credit Card</option>
                    <option>Debit Card</option>
                  </select>
                </div>
                <Button className="w-full" onClick={processRecharge}>
                  Proceed to Payment
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recharge History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Recharge History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rechargeHistory.map((recharge) => (
                  <div key={recharge.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium">₹{recharge.amount}</p>
                      <p className="text-sm text-gray-600">{recharge.date} • {recharge.mode}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800">{recharge.status}</Badge>
                      <p className="text-sm text-gray-600 mt-1">{recharge.units} units</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* New Complaint Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2 text-blue-600" />
                  Log New Complaint
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="complaintType" className="block text-sm font-medium mb-2">Complaint Type</label>
                  <select
                    id="complaintType"
                    className="w-full p-2 border border-gray-200 rounded-md"
                    value={selectedComplaintType}
                    onChange={(e) => setSelectedComplaintType(e.target.value)}
                  >
                    <option value="">Select type</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Appliances">Appliances</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="complaintDescription" className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    id="complaintDescription"
                    placeholder="Describe the issue in detail"
                    value={complaintDescription}
                    onChange={(e) => setComplaintDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Image (Optional)</label>
                  <Button variant="outline" className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium mb-2">Priority</label>
                  <select id="priority" className="w-full p-2 border border-gray-200 rounded-md">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Emergency</option>
                  </select>
                </div>
                <Button className="w-full" onClick={submitComplaint}>
                  Submit Complaint
                </Button>
              </CardContent>
            </Card>

            {/* Active Complaints */}
            <Card>
              <CardHeader>
                <CardTitle>Complaint Status Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-lg font-bold text-yellow-600">2</div>
                    <div className="text-xs text-gray-600">Open</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">1</div>
                    <div className="text-xs text-gray-600">In Process</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">5</div>
                    <div className="text-xs text-gray-600">Resolved</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Quick Tips:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Include photos for faster resolution</li>
                    <li>• Emergency issues ext. 2345</li>
                    <li>• Track status online 24/7</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Complaints List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Maintenance Requests</CardTitle>
              <CardDescription>Track all your submitted complaints and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{complaint.type} Issue</h4>
                        <p className="text-sm text-gray-600">{complaint.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Badge>
                        <Badge className={getPriorityColor(complaint.priority)}>
                          {complaint.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Submitted:</span>
                        <p>{complaint.submittedDate}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Technician:</span>
                        <p>{complaint.technicianAssigned}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">
                          {complaint.status === "Resolved" ? "Resolved:" : "Expected:"}
                        </span>
                        <p>{complaint.resolvedDate || complaint.expectedResolution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Complete History</CardTitle>
              <CardDescription>View all your residence-related activities</CardDescription>
            </CardHeader>
            <CardContent>
              {/* MODIFIED: Inner Tabs should also use value and onValueChange */}
              <Tabs value={activeTab === 'history' ? 'recharge-history' : ''} onValueChange={(val) => {
                // This is a nested tab, so we need a slightly different approach
                // We'll only update if the outer tab is 'history'
                if (activeTab === 'history') {
                  // You might want to introduce a separate state for the inner tab
                  // For simplicity, we'll just keep the first tab active by default
                  // when the main history tab is selected.
                }
              }}>
                <TabsList>
                  <TabsTrigger value="recharge-history">Recharge History</TabsTrigger>
                  <TabsTrigger value="maintenance-history">Maintenance History</TabsTrigger>
                </TabsList>
                <TabsContent value="recharge-history" className="mt-4">
                  <div className="space-y-3">
                    {rechargeHistory.map((recharge) => (
                      <div key={recharge.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Zap className="h-5 w-5 text-yellow-600" />
                          <div>
                            <p className="font-medium">₹{recharge.amount} Recharge</p>
                            <p className="text-sm text-gray-600">{recharge.date} • {recharge.mode}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800">{recharge.status}</Badge>
                          <p className="text-sm text-gray-600 mt-1">{recharge.units} units added</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="maintenance-history" className="mt-4">
                  <div className="space-y-3">
                    {complaints.map((complaint) => (
                      <div key={complaint.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Wrench className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">{complaint.type} - {complaint.description}</p>
                            <p className="text-sm text-gray-600">Submitted: {complaint.submittedDate}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResidenceModule;