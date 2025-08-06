import React, { useState } from "react";
import {
  Home,
  User,
  BookOpen,
  Calendar,
  FileText,
  Bell,
  Mail,
  Image,
  List,
  X,
  Menu
} from "lucide-react";

const FacultySidebar = ({ isOpen, activeTab, onTabChange, onClose }) => {
  // --- Helper Components (mimicking Shadcn UI components with Tailwind CSS) ---

  // Simple utility to conditionally join class names (replaces `cn` from `clsx` or `class-variance-authority`)
  const cn = (...args) => args.filter(Boolean).join(' ');

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

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "profile", label: "Faculty Profile", icon: User },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "assignments", label: "Assignments", icon: FileText, badge: 3 },
    { id: "feedback", label: "Student Feedback", icon: FileText },
    { id: "leave", label: "Leave Approval", icon: Calendar, badge: 2 },
    { id: "messaging", label: "Messaging", icon: Mail, badge: 5 },
    { id: "grievance", label: "Grievance Portal", icon: List },
    { id: "eoffice", label: "E-Office", icon: FileText },
    { id: "wellness", label: "Wellness", icon: Image },
    { id: "residence", label: "Residence", icon: Home },
    { id: "startup", label: "Startup & Innovation", icon: Home },
    { id: "clubs", label: "Clubs & Societies", icon: User },
    { id: "social", label: "Social Impact", icon: User }
  ];

  const handleItemClick = (itemId) => {
    if (onTabChange) {
      onTabChange(itemId);
    }
    // Close sidebar when an item is clicked on mobile
    if (window.innerWidth < 1280) {
      onClose?.();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 xl:hidden" // Added bg-black and bg-opacity-50 for overlay effect
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "bg-white border-r border-gray-200 font-semibold transition-all duration-300 flex flex-col",
        "fixed top-0 left-0 bottom-0 z-30", // Keep z-index lower than header
        // Mobile styles
        "xl:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0",
        // Width - fixed for desktop, responsive for mobile
        "w-80 max-w-[85vw] xl:w-64"
      )}>
        <div className="p-4 border-b border-gray-200 flex-shrink-0 flex items-center justify-between">
          <h2 className="font-semibold text-blue-900">
            Faculty Portal
          </h2>

          {/* Close Button - Only visible on mobile when sidebar is open */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="flex-shrink-0 h-8 w-8 p-0 xl:hidden"
            title="Close sidebar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation with hidden scrollbar */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto scrollbar-hide">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start border border-transparent rounded-lg transition-all duration-200",
                "hover:bg-gray-100 hover:border-gray-200",
                activeTab === item.id && "bg-blue-50 border-blue-200 text-blue-700 border-l-4 border-l-blue-500"
              )}
              onClick={() => handleItemClick(item.id)}
            >
              <item.icon className={cn(
                "h-5 w-5 flex-shrink-0 mr-3",
                activeTab === item.id ? "text-blue-600" : "text-gray-600"
              )} />

              <span className={cn(
                "truncate",
                activeTab === item.id ? "font-medium" : "font-semibold"
              )}>
                {item.label}
              </span>

              {item.badge && (
                <span className={cn(
                  "ml-auto text-xs rounded-full px-2 py-1 min-w-[20px] text-center flex-shrink-0",
                  activeTab === item.id
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-500 text-white"
                )}>
                  {item.badge}
                </span>
              )}
            </Button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 text-center text-xs text-gray-500 flex-shrink-0">
          MyGBU Smart Campus v2.0.1
        </div>
      </aside>
    </>
  );
};

export default FacultySidebar;
