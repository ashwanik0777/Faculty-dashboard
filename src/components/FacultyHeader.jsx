import React, { useState } from "react";
import { Bell, User, Settings, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FacultyHeader = ({ onMenuToggle, isSidebarOpen }) => {
  const navigate = useNavigate();
  const [notifications] = useState([
    {
      id: 1,
      title: "New research grant opportunity",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Student meeting reminder",
      time: "1 day ago"
    },
    {
      id: 3,
      title: "Department seminar tomorrow",
      time: "3 days ago"
    }
  ]);

  const handleLogout = () => {
    navigate('/faculty-login');
  };

  // --- Helper Components (mimicking Shadcn UI components with Tailwind CSS) ---

  // Button Component
  const Button = ({ variant = "default", size = "default", className = "", onClick, children, disabled = false, type = "button", asChild = false }) => {
    let baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    let variantStyles = "";
    let sizeStyles = "";

    switch (variant) {
      case "default":
        variantStyles = "bg-blue-600 text-white hover:bg-blue-700"; // Primary button style
        break;
      case "ghost":
        variantStyles = "hover:bg-gray-100 hover:text-gray-900"; // Ghost button style
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
      // For icon buttons (h-10 w-10 p-0)
      case "icon":
        sizeStyles = "h-10 w-10 p-0";
        break;
      // Add other sizes if needed
    }

    const Tag = asChild ? 'div' : 'button'; // Use div if asChild is true, otherwise button

    return (
      <Tag
        type={asChild ? undefined : type} // Only apply type to button
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Tag>
    );
  };

  // Avatar Components
  const Avatar = ({ children, className = "" }) => (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
      {children}
    </div>
  );
  const AvatarImage = ({ src, className = "" }) => (
    <img src={src} alt="avatar" className={`aspect-square h-full w-full ${className}`} />
  );
  const AvatarFallback = ({ children, className = "" }) => (
    <div className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 ${className}`}>
      {children}
    </div>
  );

  // Badge Component
  const Badge = ({ className = "", children }) => (
    <span className={`inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  );

  // DropdownMenu Components
  const DropdownMenu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = React.useRef(null);
    const contentRef = React.useRef(null);

    const toggleOpen = () => setIsOpen(prev => !prev);

    // Close when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (triggerRef.current && contentRef.current &&
            !triggerRef.current.contains(event.target) &&
            !contentRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="relative">
        {React.Children.map(children, child => {
          if (child.type === DropdownMenuTrigger) {
            return React.cloneElement(child, { onClick: toggleOpen, ref: triggerRef });
          }
          if (child.type === DropdownMenuContent && isOpen) {
            return React.cloneElement(child, { ref: contentRef, setIsOpen });
          }
          return null;
        })}
      </div>
    );
  };

  const DropdownMenuTrigger = React.forwardRef(({ onClick, children, className = "" }, ref) => (
    <div ref={ref} onClick={onClick} className={`cursor-pointer ${className}`}>
      {children}
    </div>
  ));

  const DropdownMenuContent = React.forwardRef(({ children, className = "", setIsOpen, align = "end" }, ref) => {
    const alignmentClass = align === "end" ? "right-0" : "left-0";
    return (
      <div
        ref={ref}
        className={`absolute top-full mt-2 w-56 rounded-md border border-gray-200 bg-white p-1 text-gray-950 shadow-md z-50 ${alignmentClass} ${className}`}
        onClick={() => setIsOpen(false)} // Close on item click
      >
        {children}
      </div>
    );
  });

  const DropdownMenuItem = ({ onClick, children, className = "" }) => (
    <div
      className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );

  const DropdownMenuSeparator = ({ className = "" }) => (
    <div className={`-mx-1 my-1 h-px bg-gray-100 ${className}`} />
  );

  // Popover Components
  const Popover = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = React.useRef(null);
    const contentRef = React.useRef(null);

    const toggleOpen = () => setIsOpen(prev => !prev);

    // Close when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (triggerRef.current && contentRef.current &&
            !triggerRef.current.contains(event.target) &&
            !contentRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="relative">
        {React.Children.map(children, child => {
          if (child.type === PopoverTrigger) {
            return React.cloneElement(child, { onClick: toggleOpen, ref: triggerRef });
          }
          if (child.type === PopoverContent && isOpen) {
            return React.cloneElement(child, { ref: contentRef, setIsOpen });
          }
          return null;
        })}
      </div>
    );
  };

  const PopoverTrigger = React.forwardRef(({ onClick, children, className = "", asChild = false }, ref) => {
    const Tag = asChild ? 'div' : 'button';
    return (
      <Tag ref={ref} onClick={onClick} className={`cursor-pointer ${className}`}>
        {children}
      </Tag>
    );
  });

  const PopoverContent = React.forwardRef(({ children, className = "", setIsOpen, align = "end" }, ref) => {
    const alignmentClass = align === "end" ? "right-0" : "left-0";
    return (
      <div
        ref={ref}
        className={`absolute top-full mt-2 rounded-md border border-gray-200 bg-white p-4 text-gray-950 shadow-lg z-50 ${alignmentClass} ${className}`}
      >
        {children}
      </div>
    );
  });


  return (
    <header className={`
      fixed top-0 right-0
      bg-white border-b border-gray-200
      px-4 py-1
      flex items-center justify-between
      z-40
      transition-all duration-300
      left-0 xl:left-64
    `}>
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuToggle}
          className="xl:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-blue-900 truncate">
            {window.innerWidth >= 1024 ? 'Welcome Dr. Rajesh Kumar' : 'Dashboard'}
          </h1>
          {window.innerWidth >= 1024 && (
            <p className="text-sm text-gray-600 truncate">
              Associate Professor, Computer Science
            </p>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full"> {/* Changed size to icon for better button styling */}
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs">
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-3">
              <h3 className="font-semibold">Notifications</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map(notification => (
                  <div key={notification.id} className="p-2 border border-gray-200 rounded hover:bg-gray-50">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View All
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full"> {/* Changed size to icon for better button styling */}
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://placehold.co/40x40/E0E0E0/000000?text=RK" /> {/* Placeholder image */}
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <div className="p-2">
              <p className="font-medium">Dr. Rajesh Kumar</p>
              <p className="text-xs text-gray-500 truncate">rajesh.kumar@gbu.ac.in</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default FacultyHeader;
