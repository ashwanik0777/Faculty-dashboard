import React, { useState } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const escapeHtml = (text) => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  const stringText = String(text || "");
  return stringText.replace(/[&<>"']/g, (m) => map[m]);
};

const sanitizeInput = (value) => {
  return escapeHtml(value);
};

const LoginForm = () => {
  const [facultyId, setFacultyId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const Button = ({ variant = "default", size = "default", className = "", onClick, children, disabled = false, type = "button" }) => {
    let baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    let variantStyles = "";
    let sizeStyles = "";

    switch (variant) {
      case "default":
        variantStyles = "bg-blue-600 text-white hover:bg-blue-700";
        break;
    }

    switch (size) {
      case "default":
        sizeStyles = "h-10 px-4 py-2";
        break;
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

  const Input = ({ className = "", type = "text", value, onChange, placeholder, id, required }) => (
    <input
      id={id}
      type={type}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );

  const Label = ({ htmlFor, children, className = "" }) => (
    <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
      {children}
    </label>
  );

  const Checkbox = ({ id, checked, onCheckedChange, className = "" }) => (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className={`peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white ${className}`}
    />
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const sanitizedFacultyId = sanitizeInput(facultyId);
    const sanitizedPassword = sanitizeInput(password);

    setTimeout(() => {
      if (sanitizedFacultyId && sanitizedPassword) {
        navigate('/faculty-dashboard');
      } else {
       
        console.log("Please enter Faculty ID and Password");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br  to-white">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-blue-900">Faculty Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="facultyId">Faculty ID / GBU Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="facultyId"
                  type="text"
                  placeholder="Enter your Faculty ID or Email"
                  value={facultyId}
                  onChange={(e) => setFacultyId(sanitizeInput(e.target.value))}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(sanitizeInput(e.target.value))}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked)}
                />
                <Label htmlFor="remember" className="text-sm">Remember me</Label>
              </div>

              <div className="text-sm space-x-2">
                <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
                <span className="text-gray-400">|</span>
                <a href="#" className="text-blue-600 hover:underline">Reset via OTP</a>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Need help? Contact <a href="#" className="text-blue-600 hover:underline">IT Helpdesk</a></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
