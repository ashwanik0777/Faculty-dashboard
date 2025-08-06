import React, { createContext, useContext, forwardRef, useState } from "react";

// Utility function for class names
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

// Card Components
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg bg-white text-gray-900 shadow-sm border border-gray-200",
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
const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";
    
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variantStyles = {
      default: "bg-blue-600 border border-gray-200 text-white hover:bg-blue-600/90",
      destructive: "bg-red-600 border border-gray-200 text-white hover:bg-red-600/90",
      outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-100/80",
      ghost: "hover:bg-gray-100 border border-gray-200 hover:text-gray-900",
      link: "text-blue-600 border border-gray-200 underline-offset-4 hover:underline",
    };
    
    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };
    
    return (
      <Comp
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Badge Component
const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";
  
  const variantStyles = {
    default: "border-transparent bg-blue-600 text-white hover:bg-blue-600/80",
    secondary: "border-gray-200 bg-gray-200 text-gray-900 hover:bg-gray-200/80",
    destructive: "border-transparent bg-red-600 text-white hover:bg-red-600/80",
    outline: "text-gray-900 border border-gray-200",
  };
  
  return (
    <span
      ref={ref}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

// Tabs Components
const TabsContext = createContext(null);

const Tabs = ({ defaultValue, children, className, ...props }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn("flex flex-col", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "hidden sm:flex w-full  justify-center gap-2 bg-gray-100 p-1 rounded-lg", // Changed from grid to flex and added justify-center
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TabsList.displayName = "TabsList";

const TabsTrigger = forwardRef(({ className, value, children, ...props }, ref) => {
  const { value: currentValue, setValue } = useContext(TabsContext);

  const isActive = currentValue === value;

  return (
    <button
      ref={ref}
      className={cn(
        "py-2 text-sm flex items-center font-semibold justify-center rounded-md transition-all",
        isActive
          ? "bg-white px-30 text-gray-900 shadow-sm"
          : "text-gray-700 px-30 hover:bg-gray-100 hover:text-gray-700", // Added hover styles for inactive tabs
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={() => setValue(value)}
      {...props}
    >
      {children}
    </button>
  );
});TabsTrigger.displayName = "TabsTrigger";

const TabsContent = forwardRef(({ className, value, children, ...props }, ref) => {
  const { value: currentValue } = useContext(TabsContext);

  return currentValue === value ? (
    <div
      ref={ref}
      className={cn(
        "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  ) : null;
});
TabsContent.displayName = "TabsContent";

// Icons (simple implementations)
const Calendar = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const BookOpen = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const Clock = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const User = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Download = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

// Main Component
const MyCourses = () => {
  const courses = [
    {
      id: 1,
      name: "Data Structures",
      code: "CS-201",
      semester: "3rd Semester",
      students: 45,
      type: "Theory",
      schedule: "Mon, Wed, Fri - 10 AM",
      room: "LH-101",
      status: "Ongoing"
    },
    {
      id: 2,
      name: "Machine Learning",
      code: "CS-401",
      semester: "7th Semester",
      students: 32,
      type: "Theory + Lab",
      schedule: "Tue, Thu - 2 PM",
      room: "LH-201",
      status: "Ongoing"
    },
    {
      id: 3,
      name: "Research Methodology",
      code: "CS-501",
      semester: "9th Semester",
      students: 18,
      type: "Theory",
      schedule: "Wed - 4 PM",
      room: "CR-301",
      status: "Ongoing"
    }
  ];

  const timetable = [
    { day: "Monday", time: "10 AM", subject: "Data Structures", room: "LH-101", type: "Lecture" },
    { day: "Monday", time: "2 PM", subject: "Office Hours", room: "Faculty Room", type: "Consultation" },
    { day: "Tuesday", time: "2 PM", subject: "Machine Learning", room: "LH-201", type: "Lecture" },
    { day: "Tuesday", time: "4 PM", subject: "ML Lab", room: "Lab-A", type: "Practical" },
    { day: "Wednesday", time: "10 AM", subject: "Data Structures", room: "LH-101", type: "Lecture" },
    { day: "Wednesday", time: "4 PM", subject: "Research Methodology", room: "CR-301", type: "Lecture" },
    { day: "Thursday", time: "2 PM", subject: "Machine Learning", room: "LH-201", type: "Lecture" },
    { day: "Friday", time: "10 AM", subject: "Data Structures", room: "LH-101", type: "Lecture" }
  ];

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-900">My Courses</h1>
        <Button className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Download Timetable
        </Button>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Course Cards</TabsTrigger>
          <TabsTrigger value="timetable">Timetable View</TabsTrigger>
          <TabsTrigger value="calendar">Session Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="border border-gray-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription>{course.code} • {course.semester}</CardDescription>
                    </div>
                    <Badge variant={course.status === "Ongoing" ? "default" : "secondary"}>
                      {course.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-sm">
                    <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{course.type}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      View Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timetable" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Weekly Timetable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-gray-200 p-3 bg-gray-50 text-left">Time</th>
                      <th className="border border-gray-200 p-3 bg-gray-50 text-center">Monday</th>
                      <th className="border border-gray-200 p-3 bg-gray-50 text-center">Tuesday</th>
                      <th className="border border-gray-200 p-3 bg-gray-50 text-center">Wednesday</th>
                      <th className="border border-gray-200 p-3 bg-gray-50 text-center">Thursday</th>
                      <th className="border border-gray-200 p-3 bg-gray-50 text-center">Friday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["10 AM", "2 PM", "4 PM"].map((time) => (
                      <tr key={time}>
                        <td className="border border-gray-200 p-3 font-medium bg-blue-50">{time}</td>
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => {
                          const session = timetable.find(t => t.day === day && t.time === time);
                          return (
                            <td key={day} className="border border-gray-200 p-3 text-center">
                              {session ? (
                                <div className={`p-2 rounded text-sm ${
                                  session.type === "Lecture" ? "bg-blue-100 text-blue-800" :
                                  session.type === "Practical" ? "bg-green-100 text-green-800" :
                                  "bg-purple-100 text-purple-800"
                                }`}>
                                  {session.subject}
                                  <div className="text-xs mt-1">{session.room}</div>
                                </div>
                              ) : (
                                <div className="text-gray-400">-</div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Session Calendar</CardTitle>
              <CardDescription>View all your scheduled sessions and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timetable.map((session, index) => (
                  <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg">
                    <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-sm font-bold text-blue-800">
                        {session.day.slice(0, 3)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{session.subject}</h3>
                      <p className="text-sm text-gray-600">{session.time} • {session.room}</p>
                      <Badge variant="outline" className="mt-1">
                        {session.type}
                      </Badge>
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

export default MyCourses;