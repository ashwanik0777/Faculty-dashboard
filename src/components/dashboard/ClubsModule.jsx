import React, { useState } from "react";
import {
  Users, Calendar, Award, FileText, Camera, TrendingUp, Clock, Target, MessageSquare, Plus, CheckCircle, Upload, Download, Share2, MapPin, Star, Trophy, Globe, Archive, Eye, Edit
} from "lucide-react";

const ClubsModule = () => {
  const [activeTab, setActiveTab] = useState("overview"); // State to manage active tab

  const [clubs] = useState([
    { id: 1, name: "Tech Innovation Club" },
    { id: 2, name: "Robotics Society" }
  ]);

  const [events] = useState([
    { id: 1, name: "AI Workshop", club: "Tech Innovation Club", status: "Completed", date: "2024-07-05", mode: "Offline", category: "Technical", participants: 120, volunteerHours: 30, geoTagged: true, photos: 4 },
    { id: 2, name: "Robotics Competition", club: "Robotics Society", status: "Approved", date: "2024-07-10", mode: "Offline", category: "Technical", participants: 80, volunteerHours: 20, geoTagged: false, photos: 2 }
  ]);

  const [volunteers] = useState([
    { id: 1, name: "Alice", rollNo: "CS201001", totalHours: 40, badge: "Gold", recentActivity: "AI Workshop" },
    { id: 2, name: "Bob", rollNo: "CS201002", totalHours: 15, badge: "Bronze", recentActivity: "Robotics Competition" }
  ]);

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case "Bronze": return "🥉";
      case "Silver": return "🥈";
      case "Gold": return "🥇";
      case "Platinum": return "🌟";
      default: return "⭐";
    }
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Bronze": return "bg-amber-100 text-amber-800";
      case "Silver": return "bg-gray-100 text-gray-800";
      case "Gold": return "bg-yellow-100 text-yellow-800";
      case "Platinum": return "bg-purple-100 text-purple-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Draft": return "bg-gray-100 text-gray-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Approved": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // --- Helper Components (mimicking Shadcn UI) ---

  // Card Component
  const Card = ({ children, className = "" }) => (
    <div className={`rounded-lg border  border-gray-200 bg-card text-card-foreground shadow-sm ${className}`}>
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
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-10 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${isActive ? 'bg-white text-foreground shadow-sm' : ''}`}
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

  // Table Components
  const Table = ({ children, className = "" }) => (
    <div className="relative w-full overflow-auto">
      <table className={`w-full caption-bottom text-sm ${className}`}>
        {children}
      </table>
    </div>
  );
  const TableHeader = ({ children, className = "" }) => (
    <thead className={`[&_tr]:border-b ${className}`}>{children}</thead>
  );
  const TableBody = ({ children, className = "" }) => (
    <tbody className={`[&_tr:last-child]:border-0 ${className}`}>{children}</tbody>
  );
  const TableRow = ({ children, className = "" }) => (
    <tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}>
      {children}
    </tr>
  );
  const TableHead = ({ children, className = "" }) => (
    <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}>
      {children}
    </th>
  );
  const TableCell = ({ children, className = "" }) => (
    <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>
      {children}
    </td>
  );


  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-900">Clubs & Societies Management</h1>
        <Button onClick={() => setActiveTab("create-event")}> {/* Direct tab switch */}
          <Plus className="h-4 w-4 mr-2" />
          Create New Event
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="create-event">Create Event</TabsTrigger>
          <TabsTrigger value="upload-media">Upload Media</TabsTrigger>
          <TabsTrigger value="volunteer-hours">Volunteer Hours</TabsTrigger>
          <TabsTrigger value="reports">IQAC Reports</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="archive">Archive</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Clubs</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clubs.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div> {/* Static data */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Volunteer Hours</CardTitle>
                <Clock className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120</div> {/* Static data */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Participants</CardTitle>
                <Award className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">450</div> {/* Static data */}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>Recently completed and upcoming events</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Club</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.name}</TableCell>
                      <TableCell>{event.club}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{event.participants}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create-event" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Club Event</CardTitle>
              <CardDescription>Fill in the event details for approval and scheduling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Event Name</label>
                  <Input placeholder="Enter event name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Select Club</label>
                  <select className="w-full p-2 border border-gray-200 rounded-md">
                    {clubs.map((club) => (
                      <option key={club.id} value={club.id}>{club.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Time</label>
                  <Input type="time" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mode</label>
                  <select className="w-full p-2 border border-gray-200 rounded-md">
                    <option>Offline</option>
                    <option>Online</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className="w-full p-2 border border-gray-200 rounded-md">
                    <option>Technical</option>
                    <option>Cultural</option>
                    <option>Literary</option>
                    <option>Social Impact</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Expected Participants</label>
                  <Input type="number" placeholder="Enter number" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea placeholder="Enter event description" rows={4} />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Submit for Approval</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload-media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Event Media</CardTitle>
              <CardDescription>Upload event photographs and documentation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Event</label>
                <select className="w-full p-2 border border-gray-200 rounded-md">
                  {events.map((event) => (
                    <option key={event.id}>{event.name} - {event.date}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-8 w-8 text-gray-500" />
                    <p className="font-medium">Upload Event Photos</p>
                    <p className="text-sm text-gray-500">Minimum 4 photos required (JPG/PNG)</p>
                    <Button variant="outline" className="mt-2">
                      Select Files
                    </Button>
                  </div>
                </div>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <FileText className="h-8 w-8 text-gray-500" />
                    <p className="font-medium">Upload Report Document</p>
                    <p className="text-sm text-gray-500">PDF/DOCX format (Max 5MB)</p>
                    <Button variant="outline" className="mt-2">
                      Select File
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  <p className="text-sm text-blue-700">
                    Enable location services when taking photos for automatic geo-tagging
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volunteer-hours" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                Volunteer Hours Management
              </CardTitle>
              <CardDescription>Assign and track student volunteer contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Bronze</CardTitle>
                      <span>🥉</span>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-xs text-gray-500">10-24 hours</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Silver</CardTitle>
                      <span>🥈</span>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-gray-500">25-49 hours</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Gold</CardTitle>
                      <span>🥇</span>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-gray-500">50-99 hours</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Platinum</CardTitle>
                      <span>🌟</span>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1</div>
                      <p className="text-xs text-gray-500">100+ hours</p>
                    </CardContent>
                  </Card>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Roll No</TableHead>
                      <TableHead>Total Hours</TableHead>
                      <TableHead>Badge</TableHead>
                      <TableHead>Recent Activity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {volunteers.map((volunteer) => (
                      <TableRow key={volunteer.id}>
                        <TableCell className="font-medium">{volunteer.name}</TableCell>
                        <TableCell>{volunteer.rollNo}</TableCell>
                        <TableCell>{volunteer.totalHours}</TableCell>
                        <TableCell>
                          <Badge className={getBadgeColor(volunteer.badge)}>
                            {getBadgeIcon(volunteer.badge)} {volunteer.badge}
                          </Badge>
                        </TableCell>
                        <TableCell>{volunteer.recentActivity}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>IQAC Event Reports</CardTitle>
              <CardDescription>Generate and manage institutional quality reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.filter(event => event.status === "Completed").map((event) => (
                  <div key={event.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{event.name}</h3>
                        <p className="text-sm text-gray-600">{event.club} • {event.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {event.geoTagged && <Badge className="bg-green-100 text-green-800">Geo-verified</Badge>}
                        <Badge className="bg-blue-100 text-blue-800">{event.photos}/4 Photos</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">Participants</span>
                        <div>{event.participants}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Volunteer Hours</span>
                        <div>{event.volunteerHours}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Category</span>
                        <div>{event.category}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Mode</span>
                        <div>{event.mode}</div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                      <Button>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share with IQAC
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">IQAC Report Includes:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
                    <div>• Event name, date, time, and mode</div>
                    <div>• Venue with geo-location link</div>
                    <div>• Speaker/guest information</div>
                    <div>• Event summary and objectives</div>
                    <div>• 4 verified photographs</div>
                    <div>• Participant list and count</div>
                    <div>• Impact assessment</div>
                    <div>• Volunteer hours allocated</div>
                  </div>
                </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Event Calendar
              </CardTitle>
              <CardDescription>View and manage upcoming club events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-4 flex-wrap gap-2"> {/* Added flex-wrap and gap */}
                  <Button variant="outline">This Month</Button>
                  <Button variant="outline">Next Month</Button>
                  <select className="px-3 py-2 border border-gray-200 rounded-md">
                    <option>All Categories</option>
                    <option>Technical</option>
                    <option>Cultural</option>
                    <option>Literary</option>
                    <option>Social Impact</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-200 rounded-md">
                    <option>All Clubs</option>
                    <option>Tech Innovation Club</option>
                    <option>Robotics Society</option>
                  </select>
                  </div>

                <div className="grid grid-cols-7 gap-1 text-sm">
                  <div className="p-2 text-center font-medium">Sun</div>
                  <div className="p-2 text-center font-medium">Mon</div>
                  <div className="p-2 text-center font-medium">Tue</div>
                  <div className="p-2 text-center font-medium">Wed</div>
                  <div className="p-2 text-center font-medium">Thu</div>
                  <div className="p-2 text-center font-medium">Fri</div>
                  <div className="p-2 text-center font-medium">Sat</div>

                  {Array.from({ length: 31 }, (_, i) => (
                    <div key={i} className="aspect-square p-1 border border-gray-200">
                      <div className="text-xs">{i + 1}</div>
                      {(i === 4 || i === 9) && (
                        <div className="text-xs bg-blue-100 text-blue-800 rounded px-1 mt-1 truncate">
                          Event
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4 text-sm flex-wrap gap-2"> {/* Added flex-wrap and gap */}
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                    <span>Technical</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                    <span>Cultural</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                    <span>Literary</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
                    <span>Social Impact</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Archive className="h-5 w-5 mr-2" />
                Event Archive & Reports
              </CardTitle>
              <CardDescription>Access historical event data and documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-4 flex-wrap gap-2"> {/* Added flex-wrap and gap */}
                  <select className="px-3 py-2 border border-gray-200 rounded-md">
                    <option>All Years</option>
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-200 rounded-md">
                    <option>All Clubs</option>
                    <option>Tech Innovation Club</option>
                    <option>Robotics Society</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-200 rounded-md">
                    <option>All Categories</option>
                    <option>Technical</option>
                    <option>Cultural</option>
                    <option>Literary</option>
                  </select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export All
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Club</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.name}</TableCell>
                        <TableCell>{event.club}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.category}</TableCell>
                        <TableCell>{event.participants}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Globe className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">24</div>
                      <div className="text-sm text-gray-600">Total Events</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">1,250</div>
                      <div className="text-sm text-gray-600">Total Participants</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">580</div>
                      <div className="text-sm text-gray-600">Volunteer Hours</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClubsModule;
