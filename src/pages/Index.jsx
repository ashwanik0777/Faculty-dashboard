import React from "react";
import { GraduationCap, User, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Re-added useNavigate

const Index = () => {
  const navigate = useNavigate(); // Initialized useNavigate

  // --- Helper Components (mimicking Shadcn UI components with Tailwind CSS) ---

  // Card Component
  const Card = ({ children, className = "" }) => (
    <div className={`rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm ${className}`}>
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
  const Button = ({ variant = "default", size = "default", className = "", onClick, children, disabled = false, type = "button" }) => {
    let baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    let variantStyles = "";
    let sizeStyles = "";

    switch (variant) {
      case "default":
        variantStyles = "bg-blue-600 text-white hover:bg-blue-700"; // Primary button style
        break;
      case "outline":
        variantStyles = "border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900"; // Outline button style
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
        type={type}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  };

  // Restored the original navigation for handleFacultyLogin
  const handleFacultyLogin = () => {
    navigate('/faculty-login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="h-16 w-16 text-blue-600 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-blue-900">MyGBU Smart Campus</h1>
              <p className="text-xl text-blue-700">ERP System</p>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to the integrated campus management system for Gautam Buddha University
          </p>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-blue-900">Faculty Portal</CardTitle>
              <CardDescription>
                Access your teaching dashboard, course management, and academic tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleFacultyLogin}
              >
                Faculty Login
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-green-900">Student Portal</CardTitle>
              <CardDescription>
                Access your academic records, courses, and campus services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-green-600 text-white hover:bg-green-700"
                onClick={() => window.open('https://student.gbu.ac.in', '_blank')}
              >
                Student Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center space-x-6 text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600">IT Helpdesk</a>
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <span>Version 2.0.1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
