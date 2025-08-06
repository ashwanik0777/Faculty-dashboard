import { useState } from "react";
import { Mail, Send, Paperclip, Search, Users, MessageSquare, Bell } from "lucide-react";

// --- Inline UI Components ---

// Card Component (Inline)
const CustomCard = ({ children, className = "" }) => (
  <div className={`rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm ${className}`}>
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
const CustomBadge = ({ children, className = "", variant = "default" }) => {
  let variantClasses = "bg-gray-100 text-gray-800"; // Default
  if (variant === "secondary") {
    variantClasses = "bg-gray-500 text-white";
  }
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};

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

// --- Main Component ---

const MessagingModule = () => {
  const [conversations] = useState([
    {
      id: 1,
      name: "John Doe",
      avatar: "JD",
      role: "Student",
      lastMessage: "Hi there, I have a question about the assignment",
      time: "10:30 AM",
      unread: 2,
    },
    {
      id: 2,
      name: "Professor Smith",
      avatar: "PS",
      role: "Faculty",
      lastMessage: "The exam schedule has been posted",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: 3,
      name: "CS-201 Group",
      avatar: "CS",
      role: "Group",
      lastMessage: "Alice: I'll be late for the meeting",
      time: "2 days ago",
      unread: 5,
    },
  ]);

  const [messages] = useState([
    {
      id: 1,
      sender: "John Doe",
      content: "Hi there, I have a question about the assignment",
      time: "10:30 AM",
      type: "received",
    },
    {
      id: 2,
      sender: "You",
      content: "Sure, what would you like to know?",
      time: "10:32 AM",
      type: "sent",
    },
    {
      id: 3,
      sender: "John Doe",
      content: "When is the deadline for the project submission?",
      time: "10:33 AM",
      type: "received",
    },
  ]);

  const [announcements] = useState([
    {
      id: 1,
      title: "Exam Schedule Update",
      audience: "All CS-201 Students",
      content: "The final exam has been rescheduled to June 15th",
      date: "May 20, 2023",
      status: "sent",
    },
    {
      id: 2,
      title: "Office Hours Change",
      audience: "My Students",
      content: "My office hours will change to Wednesdays 2-4 PM starting next week",
      date: "May 18, 2023",
      status: "draft",
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(1);
  const [activeTab, setActiveTab] = useState("conversations"); // State for active tab

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-blue-900">Internal Messaging</h1>

      <div className="space-y-6">
        <CustomTabsList className="grid w-full grid-cols-4">
          <CustomTabsTrigger value="conversations" activeTab={activeTab} setActiveTab={setActiveTab}>Conversations</CustomTabsTrigger>
          <CustomTabsTrigger value="compose" activeTab={activeTab} setActiveTab={setActiveTab}>Compose</CustomTabsTrigger>
          <CustomTabsTrigger value="announcements" activeTab={activeTab} setActiveTab={setActiveTab}>Announcements</CustomTabsTrigger>
          <CustomTabsTrigger value="groups" activeTab={activeTab} setActiveTab={setActiveTab}>Groups</CustomTabsTrigger>
        </CustomTabsList>

        <CustomTabsContent value="conversations" activeTab={activeTab}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <CustomCard className="lg:col-span-1">
              <CustomCardHeader>
                <div className="flex items-center justify-between">
                  <CustomCardTitle className="text-lg">Messages</CustomCardTitle>
                  <CustomButton size="sm" variant="outline">
                    <Search className="h-4 w-4" />
                  </CustomButton>
                </div>
              </CustomCardHeader>
              <CustomCardContent className="p-0">
                <div className="space-y-1">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-3 cursor-pointer hover:bg-gray-50 border-l-4 ${
                        selectedConversation === conversation.id
                          ? "border-l-blue-500 bg-blue-50"
                          : "border-l-transparent"
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {conversation.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium truncate">
                              {conversation.name}
                            </p>
                            {conversation.unread > 0 && (
                              <CustomBadge className="bg-red-500 text-white text-xs">
                                {conversation.unread}
                              </CustomBadge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">
                            {conversation.role}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {conversation.lastMessage}
                          </p>
                          <p className="text-xs text-gray-400">
                            {conversation.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CustomCardContent>
            </CustomCard>

            {/* Chat Window */}
            <CustomCard className="lg:col-span-2 flex flex-col">
              <CustomCardHeader className="border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {conversations.find((c) => c.id === selectedConversation)?.avatar}
                  </div>
                  <div>
                    <CustomCardTitle className="text-lg">
                      {conversations.find((c) => c.id === selectedConversation)?.name}
                    </CustomCardTitle>
                    <p className="text-sm text-gray-600">
                      {conversations.find((c) => c.id === selectedConversation)?.role}
                    </p>
                  </div>
                </div>
              </CustomCardHeader>
              <CustomCardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.type === "sent" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === "sent"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CustomCardContent>
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <CustomButton size="sm" variant="outline">
                    <Paperclip className="h-4 w-4" />
                  </CustomButton>
                  <input
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..."
                  />
                  <CustomButton size="sm">
                    <Send className="h-4 w-4" />
                  </CustomButton>
                </div>
              </div>
            </CustomCard>
          </div>
        </CustomTabsContent>

        <CustomTabsContent value="compose" activeTab={activeTab}>
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle>Compose New Message</CustomCardTitle>
              <CustomCardDescription>
                Send a message to students, faculty, or departments
              </CustomCardDescription>
            </CustomCardHeader>
            <CustomCardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Recipient Type
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Individual Student</option>
                    <option>Multiple Students</option>
                    <option>Faculty Member</option>
                    <option>Department</option>
                    <option>Course Group</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Recipient(s)
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Rahul Sharma (2021001)</option>
                    <option>Priya Singh (2021002)</option>
                    <option>All CS-201 Students</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter message subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <div className="flex items-center space-x-2">
                <CustomButton variant="outline">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach File
                </CustomButton>
                <CustomButton>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </CustomButton>
              </div>
            </CustomCardContent>
          </CustomCard>
        </CustomTabsContent>

        <CustomTabsContent value="announcements" activeTab={activeTab}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Announcements</h2>
            <CustomButton>
              <Bell className="h-4 w-4 mr-2" />
              Create Announcement
            </CustomButton>
          </div>

          <div className="space-y-4">
            {announcements.map((announcement) => (
              <CustomCard key={announcement.id}>
                <CustomCardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CustomCardTitle className="text-lg">
                        {announcement.title}
                      </CustomCardTitle>
                      <CustomCardDescription>
                        To: {announcement.audience}
                      </CustomCardDescription>
                    </div>
                    <CustomBadge variant={announcement.status === "sent" ? "default" : "secondary"}>
                      {announcement.status === "sent" ? "Sent" : "Draft"}
                    </CustomBadge>
                  </div>
                </CustomCardHeader>
                <CustomCardContent>
                  <p className="mb-2">{announcement.content}</p>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{announcement.date}</span>
                    {announcement.status === "sent" && (
                      <CustomButton size="sm" variant="outline">
                        View Recipients
                      </CustomButton>
                    )}
                  </div>
                </CustomCardContent>
              </CustomCard>
            ))}
          </div>
        </CustomTabsContent>

        <CustomTabsContent value="groups" activeTab={activeTab}>
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Message Groups
              </CustomCardTitle>
              <CustomCardDescription>
                Manage your messaging groups and contact lists
              </CustomCardDescription>
            </CustomCardHeader>
            <CustomCardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 shadow-sm rounded-lg border border-gray-200">
                  <h3 className="font-medium mb-2">CS-201 Students</h3>
                  <p className="text-sm text-gray-600 mb-2">45 members</p>
                  <CustomButton size="sm" variant="outline">
                    Manage Group
                  </CustomButton>
                </div>
                <div className="p-4 shadow-sm rounded-lg border border-gray-200">
                  <h3 className="font-medium mb-2">CS-401 Students</h3>
                  <p className="text-sm text-gray-600 mb-2">32 members</p>
                  <CustomButton size="sm" variant="outline">
                    Manage Group
                  </CustomButton>
                </div>
                <div className="p-4 shadow-sm rounded-lg border border-gray-200">
                  <h3 className="font-medium mb-2">Faculty Colleagues</h3>
                  <p className="text-sm text-gray-600 mb-2">12 members</p>
                  <CustomButton size="sm" variant="outline">
                    Manage Group
                  </CustomButton>
                </div>
                <div className="p-4 shadow-sm rounded-lg border border-dashed border-gray-300 flex items-center justify-center min-h-[120px]">
                  <div className="text-center">
                    <h3 className="font-medium mb-2 text-gray-700">Create New Group</h3>
                    <CustomButton size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Add Group
                    </CustomButton>
                  </div>
                </div>
              </div>
            </CustomCardContent>
          </CustomCard>
        </CustomTabsContent>
      </div>
    </div>
  );
};

export default MessagingModule;