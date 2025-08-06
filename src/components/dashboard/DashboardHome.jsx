import React, { useState, useRef, useEffect } from "react";
import {
  BookOpen,
  Calendar,
  Mail,
  List,
  Bell,
  Award,
  FileText,
  ChevronLeft,
  ChevronRight,
  Smile,
  Meh,
  Frown,
  Angry,
  Trophy,
  Medal,
  Lightbulb,
  Star,
} from "lucide-react";

// Utility function for class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Card Components
const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-lg bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
);

const CardHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
);

const CardTitle = ({ className, ...props }) => (
  <h3
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
);

const CardDescription = ({ className, ...props }) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

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
    default: "bg-primary border border-gray-200 text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive border border-gray-200 text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-gray-200 bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent border border-gray-200 hover:text-accent-foreground",
    link: "text-primary border border-gray-200 underline-offset-4 hover:underline",
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
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4",
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

// Badge Component
const Badge = ({ className, variant = "default", ...props }) => {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-gray-200 bg-gray-200 text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground border border-gray-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

// Progress Component
const Progress = ({ className, value = 0, ...props }) => {
  const progressValue = Math.min(100, Math.max(0, value || 0));

  return (
    <div
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      role="progressbar"
      aria-valuenow={progressValue}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <div
        className="h-full w-full bg-black"
        style={{
          transform: `translateX(-${100 - progressValue}%)`,
          transition: 'transform 400ms cubic-bezier(0.65, 0, 0.35, 1)'
        }}
      />
    </div>
  );
};
Progress.displayName = "Progress";

// Main Dashboard Component
const DashboardHome = ({ onNavigate }) => { // Accept onNavigate prop
  const [currentSlide, setCurrentSlide] = useState(0);

  const motivationalQuotes = [
    "Teaching is the profession that creates all other professions.",
    "Education is the most powerful weapon which you can use to change the world.",
    "The art of teaching is the art of assisting discovery."
  ];

  const todayQuote = motivationalQuotes[new Date().getDate() % motivationalQuotes.length];

  const excellenceData = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      designation: "Professor, Computer Science",
      achievement: "Best Research Paper Award",
      school: "School of Engineering",
      date: "March 2024",
      image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Dr.P", // Placeholder image
      type: "research"
    },
    {
      id: 2,
      name: "Prof. Amit Gupta",
      designation: "Associate Professor, Mathematics",
      achievement: "Excellence in Teaching Award",
      school: "School of Basic Sciences",
      date: "February 2024",
      image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Prof.A", // Placeholder image
      type: "teaching"
    },
    {
      id: 3,
      name: "Rahul Kumar",
      designation: "M.Tech Student, CSE",
      achievement: "Patent Filed - AI in Education",
      school: "School of Engineering",
      date: "January 2024",
      image: "https://via.placeholder.com/150/008000/FFFFFF?text=Rahul", // Placeholder image
      type: "innovation"
    },
    {
      id: 4,
      name: "Dr. Neha Singh",
      designation: "Assistant Professor, Physics",
      achievement: "Young Scientist Award",
      school: "School of Basic Sciences",
      date: "December 2023",
      image: "https://via.placeholder.com/150/800080/FFFFFF?text=Dr.N", // Placeholder image
      type: "research"
    }
  ];

  const cardsPerPage = 3; // Number of cards to show on large screens

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (excellenceData.length - cardsPerPage + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + (excellenceData.length - cardsPerPage + 1)) % (excellenceData.length - cardsPerPage + 1));
  };


  const getAwardIcon = (type) => {
    const iconClass = "h-5 w-5";
    switch (type) {
      case "research":
        return <Trophy className={iconClass} />;
      case "teaching":
        return <Medal className={iconClass} />;
      case "innovation":
        return <Lightbulb className={iconClass} />;
      default:
        return <Star className={iconClass} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Motivational Quote */}
        <Card className="lg:col-span-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Quote of the Day</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg italic">"{todayQuote}"</p>
          </CardContent>
        </Card>

        {/* Email Alerts */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Alerts</CardTitle>
            <Mail className="h-4 w-4 ml-auto text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">3</div>
            <p className="text-xs text-muted-foreground">Unread messages</p>
            <div className="mt-2 space-y-1">
              <div className="text-xs p-2 bg-blue-50 rounded ">Student Query - CS101</div>
              <div className="text-xs p-2 bg-blue-50 rounded ">Meeting Reminder</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 lg:grid-cols-4 gap-6">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
            <List className="h-4 w-4 ml-auto text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">7</div>
            <p className="text-xs text-muted-foreground">Actionable items</p>
            {/* Review task button routes to Assignment */}
            <Button size="sm" variant="default" className="black hover:bg-gray-200 mt-2 w-full" onClick={() => onNavigate("assignments")}>View Tasks</Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <FileText className="h-4 w-4 ml-auto text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-xs text-muted-foreground">Assignments to grade</p>
            {/* Review button routes to Leave Request */}
            <Button size="sm" variant="default" className="black mt-2 hover:bg-gray-200 w-full" onClick={() => onNavigate("assignments")}>Review Now</Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leave Requests</CardTitle>
            <Bell className="h-4 w-4 ml-auto text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">5</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
            {/* Review button routes to Leave Request */}
            <Button size="sm" variant="default" className="black hover:bg-gray-200 mt-2 w-full" onClick={() => onNavigate("leave")}>Review</Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 ml-auto text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">8</div>
            <p className="text-xs text-muted-foreground">New alerts</p>
            {/* Notification button routes to Messages */}
            <Button size="sm" variant="default" className="black hover:bg-gray-200 mt-2 w-full" onClick={() => onNavigate("messaging")}>View All</Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assigned Courses */}
          <Card className="bg-white ">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Assigned Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg ">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">Data Structures</h3>
                      <p className="text-sm text-gray-600">CS-201 • Semester 3</p>
                    </div>
                    <Badge variant="secondary">Ongoing</Badge>
                  </div>
                  <p className="text-sm text-blue-600 mb-2">Next Class 10 AM</p>
                  {/* View courses button routes to My courses */}
                  <Button size="sm" variant="default" className="black hover:bg-gray-200 w-full" onClick={() => onNavigate("courses")}>View Course</Button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">Machine Learning</h3>
                      <p className="text-sm text-gray-600">CS-401 • Semester 7</p>
                    </div>
                    <Badge variant="secondary">Ongoing</Badge>
                  </div>
                  <p className="text-sm text-blue-600 mb-2">Next Class 2 PM</p>
                  {/* View courses button routes to My courses */}
                  <Button size="sm" variant="default" className="black hover:bg-gray-200 w-full" onClick={() => onNavigate("courses")}>View Course</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* These buttons are now connected to the respective pages */}
                <Button variant="default" className="black hover:bg-gray-200 h-20 flex flex-col " onClick={() => onNavigate("assignments")}>
                  <FileText className="h-6 w-6 mb-2" />
                  <span className="text-xs">Upload Assignment</span>
                </Button>
                <Button variant="default" className="black hover:bg-gray-200 h-20 flex flex-col " onClick={() => onNavigate("attendance")}>
                  <Calendar className="h-6 w-6 mb-2" />
                  <span className="text-xs">Mark Attendance</span>
                </Button>
                <Button variant="default" className="black hover:bg-gray-200 h-20 flex flex-col " onClick={() => onNavigate("leave")}>
                  <List className="h-6 w-6 mb-2" />
                  <span className="text-xs">View Requests</span>
                </Button>
                <Button variant="default" className="black hover:bg-gray-200 h-20 flex flex-col " onClick={() => onNavigate("messaging")}>
                  <Bell className="h-6 w-6 mb-2" />
                  <span className="text-xs">Send Notice</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Goal & Progress Tracker */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Goal & Progress Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Teaching Goal</span>
                  <span>16/20 lectures</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Research Goal</span>
                  <span>2/5 papers submitted</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Wellness Activity</span>
                  <span>3/7 days completed</span>
                </div>
                <Progress value={43} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <h4 className="font-medium text-sm">Faculty Meeting</h4>
                </div>
                <p className="text-xs text-gray-600">Tomorrow 3 PM • Conference Hall</p>
              </div>
              <div className="p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <h4 className="font-medium text-sm">Tech Workshop</h4>
                </div>
                <p className="text-xs text-gray-600">Friday 10 AM • IT Dept</p>
              </div>
              <Button size="sm" variant="default" className="black hover:bg-gray-200 w-full">View All Events</Button>
            </CardContent>
          </Card>

          {/* Research Snapshot */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Research Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-blue-50 rounded ">
                  <div className="text-lg font-bold text-blue-600">8</div>
                  <div className="text-xs text-gray-600">Publications</div>
                </div>
                <div className="p-2 bg-green-50 rounded ">
                  <div className="text-lg font-bold text-green-600">3</div>
                  <div className="text-xs text-gray-600">Projects</div>
                </div>
                <div className="p-2 bg-purple-50 rounded ">
                  <div className="text-lg font-bold text-purple-600">2</div>
                  <div className="text-xs text-gray-600">Grants</div>
                </div>
              </div>
              <Button size="sm" variant="default" className="black hover:bg-gray-200 w-full">View Research Work</Button>
            </CardContent>
          </Card>

          {/* Wellness Widget */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-pink-600" />
                Wellness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                "Take time to make your soul happy. A healthy mind leads to better teaching."
              </p>
              <div className="grid grid-cols-4 gap-2 mb-3">
                <Button size="sm" variant="default" className="black p-1 text-xs">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="default" className="black p-1 text-xs">
                  <Meh className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="default" className="black p-1 text-xs">
                  <Frown className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="default" className="black p-1 text-xs">
                  <Angry className="h-4 w-4" />
                </Button>
              </div>
              {/* View weekly summary routes to Wellness page */}
              <Button size="sm" variant="default" className="black hover:bg-gray-200 w-full" onClick={() => onNavigate("wellness")}>View Weekly Summary</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Celebrating Excellence Section */}
      <Card className="mt-8 bg-white relative overflow-hidden">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 transform -translate-x-1/2 -z-10" />

        <CardHeader className="text-center relative z-10 bg-white/80 backdrop-blur-sm">
          <CardTitle className="text-2xl font-bold text-blue-900 flex items-center justify-center">
            <Award className="h-6 w-6 mr-2 text-yellow-600" />
            Celebrating GBU Excellence
          </CardTitle>
          <CardDescription className="relative z-10">
            Recognizing outstanding achievements of our faculty and students
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="relative">
            <div className="flex items-center justify-between mb-4 px-4 sm:px-0">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm text-gray-600">
                Scroll to see more achievements
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                disabled={currentSlide >= excellenceData.length - cardsPerPage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out pl-5 -pr-2.5 mx-2"
                style={{ transform: `translateX(calc(-${currentSlide * (100 / cardsPerPage)}% - ${currentSlide * 8}px))` }}
              >
                {excellenceData.map((person) => (
                  <div
                    key={person.id}
                    className="flex-none w-full md:w-1/2 lg:w-1/3 p-2 group"
                  >
                    <Card className="h-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="relative mb-4">
                          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full overflow-hidden border-2 border-white shadow">
                            <img
                              src={person.image}
                              alt={person.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute top-2 -right-2 text-2xl">
                            {getAwardIcon(person.type)}
                          </div>
                        </div>

                        <div className="text-center space-y-2">
                          <h3 className="font-bold text-lg text-gray-900">{person.name}</h3>
                          <p className="text-sm text-gray-600">{person.designation}</p>

                          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 rounded-lg border border-yellow-200">
                            <h4 className="font-semibold text-yellow-800 mb-1">{person.achievement}</h4>
                            <p className="text-xs text-yellow-700">{person.school}</p>
                            <p className="text-xs text-yellow-600 font-medium">{person.date}</p>
                          </div>

                          <Button
                            variant="outline"
                            className="mt-3 w-full group-hover:bg-blue-50 group-hover:border-blue-200"
                            size="sm"
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;